<script>
  import { PROJECTS } from "$lib/projects";
</script>

<div class="flex flex-col sm:flex-row pt-8 gap-8">
  {#each PROJECTS as project (project.name)}
    <div class="max-w-xs">
      <img class="" src="{project.images[0]}"> 
      <h3 class="mt-2 font-bold text-zinc-700">{project.name}</h3>
      <p></p>
    </div>
  {/each}
</div>
