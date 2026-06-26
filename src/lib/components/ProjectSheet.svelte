<script>
  import { gsap } from "gsap";
  import { onMount } from "svelte";


  let visible = false;
  let currentProject = "";
  let sheetElement;

  onMount(() => {
    window.navigation.addEventListener('navigate', (event) => {
      setTimeout(() => {
        if(currentProject !== getCurrentProject()){
          console.log('Project has changed')
          currentProject = getCurrentProject();
          show();
        }
      }, 1);
    });
  });

  function getCurrentProject(){
    if(typeof window == undefined) return;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const slug = urlParams.get('project');

    return slug;
  }

  function show(){
    gsap.fromTo(sheetElement, {y: 500, opacity: .5}, {y: 0, opacity: 1, duration: .5, ease: "power2.out"});
  }
</script>


<div class="fixed bottom-0 left-1/2 -translate-x-1/2 translate-y-10000 h-8/10 bg-zinc-100" bind:this={sheetElement}>
  <p>Project sheet</p>
</div>