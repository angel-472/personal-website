<script lang="ts">
  export let data;

</script>
<main aria-label="Projects page" class="w-full flex flex-col gap-8 text-zinc-100">
  <section class="flex flex-col" aria-label="Projects Header">
    <h1 class="text-5xl sm:text-6xl font-bold">Projects</h1>
    <p class="text-lg text-zinc-400 mt-4">A collection of my recent work and side projects.</p>
  </section>

  <pre>
  Projects API Data:
    
  {JSON.stringify(data.projects, null, 2)}
  </pre>

  <!-- TODO: Render project cards and project page (like blog posts but styled differently) -->
</main>