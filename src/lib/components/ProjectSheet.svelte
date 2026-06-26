<script>
  import { gsap } from "gsap";
    import { X } from "lucide-svelte";
  import { onMount } from "svelte";

  let sheetElement = $state();
  let overlayElement = $state();
  let visible = $state(false);
  let currentProject = $state();
  let projectFile = $state();

  const OVERLAY_OPACITY = 40;

  // Listening to url changes SPA style with patch for Safari and other incompatible browsers
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
      currentProject = getCurrentProject();
      projectFile = getProjectFile(currentProject);
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
    visible = true;
    gsap.fromTo(overlayElement, {opacity: 0}, {opacity: OVERLAY_OPACITY * .01, duration: .180})
    const documentHeight = document.body.scrollHeight;
    gsap.fromTo(sheetElement, {y: documentHeight}, {y: 0, duration: .180, ease: "power2.out"}).then(() => {
      document.body.style.overflow = 'hidden'; // Disables scrollingz
    });
  }
  function hide(){
    if(visible == false){
      return;
    }
    console.log('hiding')
    const scrollHeight = sheetElement.scrollHeight;
    gsap.fromTo(overlayElement, {opacity: OVERLAY_OPACITY * .01}, {opacity: 0, duration: .180})
    gsap.fromTo(sheetElement, {y: 0}, {y: scrollHeight, duration: .180, ease: "power2.in"}).then(() => {
      visible = false;
      currentProject = undefined;
      projectFile = undefined;
      document.body.style.overflow = ''; //Re-enables scrolling
    });
  }

  function getProjectFile(projectSlug){
    const postFiles = import.meta.glob('/src/projects/*.md', { eager: true });
    const postFile = postFiles["/src/projects/" + projectSlug + ".md"];
    return postFile;
  }

  // Detect escape key to close project
  function handleKeydown(){
    if(event.key == 'Escape' && visible == true){
      hide();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if visible}
  <!-- Dark overlay -->
  <div class="fixed top-0 left-0 w-screen h-screen bg-zinc-900" bind:this={overlayElement}>
  </div>
  <div
    class="fixed bottom-0 left-1/2 -translate-x-1/2 h-[90dvh] w-full sm:w-2xl flex flex-col overflow-hidden rounded-2xl rounded-b-none border border-zinc-200 bg-zinc-50"
    bind:this={sheetElement}
  >
    {#if projectFile !== undefined}
      <div id="project-content" class="project-post flex-1 overflow-y-auto px-8 pt-8 pb-16" aria-label={`Project post content for ${projectFile.metadata.name}`}>
          <!-- Close button -->
          <button class="rounded-full absolute top-8 right-8 cursor-pointer bg-zinc-50 p-1" onclick={hide}><X size={24}/></button>
          <!-- Project Details & Images -->
          <h1>{projectFile.metadata.name}</h1>
          {#if projectFile.metadata.images?.length > 0}
            {#each projectFile.metadata.images as imageSrc}
              <img src={imageSrc} alt="Screenshot of project {projectFile.metadata.name}"/>
            {/each}
          {/if}
          <!-- RENDERS PROJECT CONTENT FROM MARKDOWN -->
          {@render projectFile.default()}
      </div>
    {/if}
  </div>
{/if}




<!-- Styles for rendered project post markdown -->
<style>
  @reference "tailwindcss";

  .project-post {
    color: #3f3f46; /* zinc-700 */
    font-family: 'Google Sans', sans-serif;
  }

  /* Typography */
  .project-post :global(h1),
  .project-post :global(h2),
  .project-post :global(h3),
  .project-post :global(h4) {
    color: #18181b; /* zinc-900 */
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    line-height: 1.2;
    font-weight: 700;
    letter-spacing: -0.02em; /* tracking-tight */
  }

  .project-post :global(h1) {
    font-size: 2.25rem;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }

  .project-post :global(h2) {
    font-size: 1.625rem;
  }

  .project-post :global(h3) {
    font-size: 1.3rem;
  }

  .project-post :global(p) {
    font-size: 1.0625rem;
    line-height: 1.75;
    margin-bottom: 1.5rem;
    color: #52525b; /* zinc-600 */
  }

  /* Links */
  .project-post :global(a) {
    @apply font-bold text-zinc-900 underline underline-offset-4 decoration-zinc-300 transition-colors duration-200 hover:text-zinc-600 hover:decoration-zinc-500;
  }

  /* Lists */
  .project-post :global(ul),
  .project-post :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    font-size: 1.0625rem;
    line-height: 1.75;
    color: #52525b; /* zinc-600 */
  }

  .project-post :global(ul) {
    list-style-type: disc;
  }

  .project-post :global(ol) {
    list-style-type: decimal;
  }

  .project-post :global(li) {
    margin-bottom: 0.5rem;
  }

  /* Quotes */
  .project-post :global(blockquote) {
    border-left: 2px solid #d4d4d8; /* zinc-300 */
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    font-size: 1.1875rem;
    color: #71717a; /* zinc-500 */
  }

  /* Media */
  .project-post :global(img),
  .project-post :global(video) {
    max-width: 100%;
    height: auto;
    margin: 2.5rem 0;
    border-radius: 1rem; /* rounded-2xl, matches site cards */
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
  }

  /* Code */
  .project-post :global(pre) {
    background-color: #18181b; /* zinc-900, matches site's dark accent elements */
    padding: 1.25rem;
    border-radius: 1rem; /* rounded-2xl */
    overflow-x: auto;
    margin: 2rem 0;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .project-post :global(code) {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    background-color: #e4e4e7; /* zinc-200 */
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.85em;
    color: #18181b; /* zinc-900 */
  }

  .project-post :global(pre code) {
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    font-size: 1em;
    color: #f4f4f5; /* zinc-100 */
  }

  /* Dividers */
  .project-post :global(hr) {
    border: 0;
    border-top: 1px solid #e4e4e7; /* zinc-200 */
    margin: 3rem auto;
    width: 60%;
  }
</style>