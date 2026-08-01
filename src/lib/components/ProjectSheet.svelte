<!-- TODO: Add click outside sheet detection to close sheet -->
<script>
  import { gsap } from "gsap";
  import { X, ArrowUpRight, Github } from "lucide-svelte";
  import MarkdownContent from "$lib/components/MarkdownContent.svelte";
  import { onMount } from "svelte";

  let sheetElement = $state();
  let overlayElement = $state();
  let visible = $state(false);
  let currentProject = $state();
  let projectFile = $state();

  const OVERLAY_OPACITY = 50;

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

      setTimeout(() => {
        updateCurrentProject();
      }, 1)
    })();

    // Usage: Listen to your new global event
    window.addEventListener("locationchange", () => {
      updateCurrentProject();
    });
  });

  function getCurrentProject() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const projectSlug = urlParams.get("project");

    return projectSlug;
  }

  $effect(() => {
    if(currentProject !== undefined && currentProject !== "" && typeof currentProject == 'string'){
      show();
    } 
    else {
      hide();
    }
  });
  function show(instant = false) {
    visible = true; 
    requestAnimationFrame(() => {
      gsap.fromTo(overlayElement, {opacity: 0}, {opacity: OVERLAY_OPACITY * .01, duration: .180})
      const documentHeight = document.body.scrollHeight;
      gsap.fromTo(sheetElement, {y: documentHeight}, {y: 0, duration: .180, ease: "power2.out"}).then(() => {
        document.body.style.overflow = 'hidden'; // Disables scrollingz
      });
    })

  }
  function hide(){
    if(visible == false){
      return;
    }
    const scrollHeight = sheetElement.scrollHeight;
    gsap.fromTo(overlayElement, {opacity: OVERLAY_OPACITY * .01}, {opacity: 0, duration: .180})
    gsap.fromTo(sheetElement, {y: 0}, {y: scrollHeight, duration: .180, ease: "power2.in"}).then(() => {
      visible = false;
      currentProject = undefined;
      projectFile = undefined;
      document.body.style.overflow = ''; //Re-enables scrolling
      clearUrlParameter();
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

  function clearUrlParameter(){
    const url = new URL(window.location.href);
    url.searchParams.delete('project');
    window.history.replaceState({}, document.title, url.toString());
  }

  function updateCurrentProject(){
    currentProject = getCurrentProject();
    projectFile = getProjectFile(currentProject);
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if visible}
  <!-- Dark overlay -->

  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="fixed top-0 left-0 w-screen h-screen bg-zinc-900" bind:this={overlayElement} onclick={hide}>
  </div>
  <div
    class="fixed bottom-0 left-1/2 -translate-x-1/2 h-[90dvh] w-full sm:w-2xl flex flex-col overflow-hidden rounded-2xl rounded-b-none border border-zinc-200 bg-zinc-50"
    bind:this={sheetElement}
  >
    {#if projectFile !== undefined}
      <div id="project-content" class="flex-1 overflow-y-auto px-8 pt-8 pb-16" aria-label={`Project post content for ${projectFile.metadata.name}`}>
          <!-- Close button -->
          <button class="rounded-full absolute top-8 right-8 cursor-pointer bg-zinc-50 p-1" onclick={hide}><X size={24}/></button>
          <!-- Project Details & Images -->
          <h1 class="mt-2 text-4xl font-bold">{projectFile.metadata.name}</h1>
          <!-- Links (Demo / Github) -->
          <div class="flex gap-4">
            {#if projectFile.metadata.demo}
              <a href={projectFile.metadata.demo} target="_blank" class="flex items-center gap-2 font-medium hover:text-zinc-600 transition-colors duration-200 mt-2"><ArrowUpRight size={16}/>Demo</a>
            {/if}
            {#if projectFile.metadata.github}
              <a href={projectFile.metadata.github} target="_blank" class="flex items-center gap-2 font-medium hover:text-zinc-600 transition-colors duration-200 mt-2"><Github size={16}/>GitHub</a>
            {/if}
          </div>
          {#if projectFile.metadata.images?.length > 0}
            {#each projectFile.metadata.images as imageSrc}
              <img allow_enlarge=true class="rounded-2xl shadow-sm my-8" src={imageSrc} alt="Screenshot of project {projectFile.metadata.name}"/>
            {/each}
          {/if}
          <!-- RENDERS PROJECT CONTENT FROM MARKDOWN -->
          <MarkdownContent>
            {@render projectFile.default()}
          </MarkdownContent>

      </div>
    {/if}
  </div>
{/if}
