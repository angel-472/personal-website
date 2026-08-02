<script lang="ts">
  import ProjectsGrid from "$lib/components/ProjectsGrid.svelte";
  import { ArrowUpRight } from "lucide-svelte";

  let { data } = $props();
</script>

<!-- Projects -->
<section id="projects" aria-labelledby="projects-heading" class="flex flex-col gap-4">
  <h2 id="projects-heading" class="sr-only">Featured Projects</h2>
  <ProjectsGrid projects={data.projects} />
  <a class="text-sm font-medium flex items-center gap-1 hover:text-zinc-600 transition duration-200" href="https://github.com/angel-472">See more on my GitHub <ArrowUpRight class="size-4 shrink-0" aria-hidden="true" /></a>
</section>
