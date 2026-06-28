<!-- Allows images on posts to be enlarged when clicked, with zoom + pan support -->

<script>
  import { fade } from 'svelte/transition';

  const MIN_SCALE = 1;
  const MAX_SCALE = 5;

  let imgSrc = $state("");
  let scale = $state(1);
  let tx = $state(0);
  let ty = $state(0);

  let containerEl = $state(null);
  let imgEl = $state(null);

  // Active pointers for unified mouse/touch handling
  const pointers = new Map();
  let lastX = 0;
  let lastY = 0;
  let prevPinchDist = 0;
  let prevPinchMid = null;
  let moved = false;
  let lastTapTime = 0;
  let lastTapX = 0;
  let lastTapY = 0;

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  function open(src) {
    imgSrc = src;
    resetTransform();
  }

  function hide() {
    imgSrc = "";
    resetTransform();
    pointers.clear();
  }

  function resetTransform() {
    scale = 1;
    tx = 0;
    ty = 0;
  }

  // Keep the image from being dragged entirely out of view
  function clampPan() {
    if (!imgEl || !containerEl) return;
    const iw = imgEl.offsetWidth * scale;
    const ih = imgEl.offsetHeight * scale;
    const maxX = Math.max(0, (iw - containerEl.clientWidth) / 2);
    const maxY = Math.max(0, (ih - containerEl.clientHeight) / 2);
    tx = clamp(tx, -maxX, maxX);
    ty = clamp(ty, -maxY, maxY);
  }

  // Zoom toward a screen point (relative to the container center)
  function zoomAt(newScale, px, py) {
    newScale = clamp(newScale, MIN_SCALE, MAX_SCALE);
    const ratio = newScale / scale;
    tx = px - (px - tx) * ratio;
    ty = py - (py - ty) * ratio;
    scale = newScale;
    if (scale === MIN_SCALE) {
      tx = 0;
      ty = 0;
    } else {
      clampPan();
    }
  }

  function centerRelative(clientX, clientY) {
    const rect = containerEl.getBoundingClientRect();
    return {
      x: clientX - rect.left - rect.width / 2,
      y: clientY - rect.top - rect.height / 2
    };
  }

  // --- Global click: enlarge an image that opts in via allow_enlarge ---
  function handleAnyClick(event) {
    if (imgSrc !== "") return; // viewer already open; handled below
    if (event.target.localName === 'img' && event.target.hasAttribute('allow_enlarge')) {
      open(event.target.src);
    }
  }

  // Click on the dimmed backdrop (not the image) closes the viewer
  function handleBackdropClick(event) {
    if (event.target === containerEl) hide();
  }

  // --- Wheel zoom (desktop) ---
  function handleWheel(event) {
    event.preventDefault();
    const { x, y } = centerRelative(event.clientX, event.clientY);
    const factor = Math.exp(-event.deltaY * 0.0015);
    zoomAt(scale * factor, x, y);
  }

  // --- Pointer-based pan + pinch ---
  function handlePointerDown(event) {
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    moved = false;
    if (pointers.size === 1) {
      lastX = event.clientX;
      lastY = event.clientY;
    } else if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      prevPinchDist = Math.hypot(a.x - b.x, a.y - b.y);
      prevPinchMid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    }
  }

  function handlePointerMove(event) {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    // Capture lazily, only while actually panning/pinching, so a plain
    // click (e.g. on the backdrop to close) is left intact.
    const capture = () => {
      if (!event.target.hasPointerCapture?.(event.pointerId)) {
        event.target.setPointerCapture?.(event.pointerId);
      }
    };

    if (pointers.size === 2) {
      // Pinch to zoom
      capture();
      const [a, b] = [...pointers.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      if (prevPinchDist) {
        const c = centerRelative(mid.x, mid.y);
        zoomAt(scale * (dist / prevPinchDist), c.x, c.y);
        // Pan along with the moving midpoint
        if (prevPinchMid && scale > MIN_SCALE) {
          tx += mid.x - prevPinchMid.x;
          ty += mid.y - prevPinchMid.y;
          clampPan();
        }
      }
      prevPinchDist = dist;
      prevPinchMid = mid;
      moved = true;
    } else if (pointers.size === 1 && scale > MIN_SCALE) {
      // Drag to pan when zoomed in
      capture();
      tx += event.clientX - lastX;
      ty += event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      clampPan();
      moved = true;
    }
  }

  function handlePointerUp(event) {
    const wasSingle = pointers.size === 1;
    pointers.delete(event.pointerId);
    prevPinchDist = 0;
    prevPinchMid = null;
    if (pointers.size === 1) {
      const [p] = [...pointers.values()];
      lastX = p.x;
      lastY = p.y;
      return;
    }

    // Double tap / double click toggles zoom (single pointer, no drag)
    if (wasSingle && !moved) {
      const now = Date.now();
      const isDouble =
        now - lastTapTime < 300 &&
        Math.hypot(event.clientX - lastTapX, event.clientY - lastTapY) < 30;
      if (isDouble) {
        const { x, y } = centerRelative(event.clientX, event.clientY);
        zoomAt(scale > MIN_SCALE ? MIN_SCALE : 2.5, x, y);
        lastTapTime = 0;
      } else {
        lastTapTime = now;
        lastTapX = event.clientX;
        lastTapY = event.clientY;
      }
    }
  }
</script>

<svelte:window onclick={handleAnyClick} />

{#if imgSrc !== ""}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    bind:this={containerEl}
    onclick={handleBackdropClick}
    onwheel={handleWheel}
    transition:fade={{ duration: 150 }}
    class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-zinc-900/70 touch-none select-none"
  >
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <img
      bind:this={imgEl}
      alt=""
      draggable="false"
      src={imgSrc}
      onpointerdown={handlePointerDown}
      onpointermove={handlePointerMove}
      onpointerup={handlePointerUp}
      onpointercancel={handlePointerUp}
      style="transform: translate({tx}px, {ty}px) scale({scale});"
      class="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain will-change-transform"
    />
  </div>
{/if}
