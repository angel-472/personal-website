<script>
  const today = new Date();
  const age = today.getFullYear() - 2004 - (today.getMonth() < 9 ? 1 : 0);
</script>


<section id="hero" class="mt-16">
  <!-- Pic and text side by side -->
  <div class="flex items-center gap-16"> 
    <img class="w-52 h-52 rounded-full object-cover outline-3 outline-dashed p-1" src="/img/profile.jpeg" alt="Simple selfie of Angel Diaz, the portfolio owner"/>
    <!-- Text -->
    <div>
      <h1 class="font-bold text-3xl">Hi, i'm Angel Diaz 👋</h1>
      <p class="mt-4 font-bold">{age} yo Full Stack Software Engineer from Puerto Rico 🇵🇷</p>
      <p class="max-w-md">Focused on backend systems and game development. With educational background in computer systems and networking.</p>

      <!-- Quick Links -->
      <div class="mt-8 flex gap-4">
        <a class="px-4 py-2 border-3 border-dashed rounded-full hover:bg-zinc-200" href="https://www.linkedin.com/in/angel-diaza/" target="_blank">LinkedIn</a>
        <a class="px-4 py-2 border-3 border-dashed rounded-full hover:bg-zinc-200" href="https://github.com/angel-472" target="_blank">GitHub</a>
        <a class="px-4 py-2 border-3 border-dashed rounded-full hover:bg-zinc-200" href="https://www.youtube.com/@diazadev" target="_blank">YouTube</a>
      </div>
    </div>
  </div>

</section>

<section id="projects" class="mt-16">
  <h2 class="font-bold text-3xl">Featured Projects</h2>
</section>

<section id="posts" class="mt-16">
  <h2 class="font-bold text-3xl">Posts</h2>
</section>

<section id="contact" class="mt-16">
  <h2 class="font-bold text-3xl">Contact Me</h2>
</section>