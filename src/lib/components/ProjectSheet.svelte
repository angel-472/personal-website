<script>
  import { gsap } from "gsap";
  import { onMount } from "svelte";

  let sheetElement = $state();
  let visible = $state(false);
  let currentProject = $state();

  // Listening to url changes SPA style
  onMount(() => {
    (() => {
      const patchHistory = (type) => {
        const original = history[type];
        return function () {
          const result = original.apply(this, arguments);
          const event = new Event(type.toLowerCase());
          event.arguments = arguments;
          window.dispatchEvent(event);

          const changeEvent = new Event("locationchange");
          window.dispatchEvent(changeEvent);
          return result;
        };
      };

      // Override pushState and replaceState
      history.pushState = patchHistory("pushState");
      history.replaceState = patchHistory("replaceState");

      // Listen to browser back/forward buttons
      window.addEventListener("popstate", () => {
        window.dispatchEvent(new Event("locationchange"));
      });
    })();

    // Usage: Listen to your new global event
    window.addEventListener("locationchange", () => {
      console.log("URL changed to:", window.location.href);
      console.log(getCurrentProject());
    });
  });

  function getCurrentProject() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const projectSlug = urlParams.get("project");

    return projectSlug;
  }

  $effect(() => {
    if(currentProject !== undefined && currentProject !== ""){
      show();
    } 
    else {
      hide();
    }
  });
  function show() {
    console.log('showing')
  }
  function hide(){
    console.log('hiding')
  }
</script>

{#if visible}
  <div
    class="fixed bottom-0 left-1/2 -translate-x-1/2 h-[90vh] bg-zinc-50 flex"
    bind:this={sheetElement}
  >
    <p>Project overlay sheet thing</p>
  </div>
{/if}
