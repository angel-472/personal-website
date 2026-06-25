<script>
    import ProjectsPreview from "$lib/components/ProjectsPreview.svelte";

  const today = new Date();
  const age = today.getFullYear() - 2004 - (today.getMonth() < 9 ? 1 : 0);
  
</script>


<section id="hero" class="py-16">
  <!-- Pic and text side by side -->
  <div class="flex flex-col sm:flex-row items-center gap-16"> 
    <img class="w-52 h-52 rounded-full object-cover shadow-sm" src="/img/profile.jpeg" alt="Simple selfie of Angel Diaz, the portfolio owner"/>
    <!-- Text -->
    <div class="flex flex-col">
      <h1 class="font-bold text-3xl sm:text-4xl">Hi, i'm Angel Diaz 👋</h1>
      <p class="mt-4 font-bold">{age} yo Full Stack Software Engineer from Puerto Rico 🇵🇷</p>
      <p class="max-w-md">Focused on backend systems and game development. With educational background in computer systems and networking.</p>

      <!-- Quick Links -->
      <div class="mt-8 sm:mt-4 flex gap-4 justify-center sm:justify-start">
        <a class="px-4 py-1 border-2 rounded-full border-dashed hover:bg-zinc-200" href="https://github.com/angel-472" target="_blank">GitHub</a>
        <a class="px-4 py-1 border-2 rounded-full border-dashed hover:bg-zinc-200" href="https://www.youtube.com/@diazadev" target="_blank">YouTube</a>
        <a class="px-4 py-1 border-2 rounded-full border-dashed hover:bg-zinc-200" href="https://www.linkedin.com/in/angel-diaza/" target="_blank">LinkedIn</a>
      </div>
    </div>
  </div>

</section>

<section id="projects" class="mt-8">
  <h2 class="font-bold text-3xl">Featured Projects</h2>
  <ProjectsPreview />
</section>

<!-- <section id="posts" class="mt-16">
  <h2 class="font-bold text-3xl">Posts</h2>
</section> -->

<section id="contact" class="mt-16">
  <h2 class="font-bold text-3xl pb-8">Contact Me</h2>
  <p><span class="font-bold">Email:</span> hello@diaza.dev</p>
</section>