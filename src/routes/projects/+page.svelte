<script lang="ts">
  import Link from '$lib/components/Link.svelte';
  import { ArrowRight } from 'lucide-svelte';


  export let data;
</script>




<main aria-label="Projects page" class="w-full flex flex-col gap-8 text-zinc-100">
  <section class="flex flex-col" aria-label="Projects Header">
    <h1 class="text-5xl sm:text-6xl font-bold">Projects</h1>
    <p class="text-lg text-zinc-400 mt-4">A collection of my recent work and side projects.</p>
  </section>

  <!-- TODO: Render project cards and project page (like blog posts but styled differently) -->
   <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-8" aria-label="Projects List">
    {#each data.projects as project}
      <a href="/projects/{project.slug}" class="group"> 
      <article class="w-full min-h-75 transition-colors duration-200 flex flex-col items-start" aria-label={`Project: ${project.title}`}>
        <img src={project.coverImageUrl} alt={`Screenshot of ${project.title}`} class="w-full object-cover rounded-md mb-4 aspect-video" />
        <h2 class="text-xl font-semibold mb-2 group-hover:text-cyan-200 transition-colors duration-300">{project.title}</h2>
        <p class="text-zinc-400 mb-4">{project.description}</p>
        <!-- <span class="flex items-center mt-auto gap-2 text-cyan-200 group-hover:gap-1 transition-all">Read More <ArrowRight size={20} /></span> -->
      </article>
      </a>
    {/each}
  </section>
</main>