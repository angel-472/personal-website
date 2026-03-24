<script lang="ts">
  import { Mail } from 'lucide-svelte';
  import Link from '$lib/components/Link.svelte';

</script>

<main aria-label="About page" class="w-full flex flex-col items-start gap-8 text-zinc-100">
  <section class="flex flex-col" aria-label="About Header">
    <h1 class="text-5xl sm:text-6xl font-bold">About Me</h1>
    <p class="text-lg text-zinc-400 mt-4">Learn more about me and my journey as a software engineer.</p>
  </section>
  <section class="flex flex-col items-start gap-4 text-lg text-zinc-300" aria-label="About Content">
    <p>Hello there! I'm <span class="text-cyan-200">Angel Diaz</span>, a software engineer based in Puerto Rico.</p>
    <p>I'm interested in full stack web dev, game dev, system design, AI, and backend systems. In my free time I'm working on videogame prototypes to explore building game engine components from scratch and real time synchronization over the network. I also enjoy experimenting with backend development and system architecture.</p>
    <p>When I'm not coding, you can find me working out at the gym, I also enjoy running. I love to explore the outdoors with my friends and family and reading about technology, philosophy, and science fiction.</p>


    <h2 class="text-2xl font-bold mt-4 text-zinc-100">Links</h2>
    <ul class="flex flex-col items-start list-inside text-zinc-400 space-y-3">
      <li>
          <Link href="https://github.com/angel-472" class="flex items-center gap-2">
            <svg class="size-5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            GitHub
          </Link>
      </li>

      <li>
        <Link href="https://youtube.com/@diazadev" class="flex items-center gap-2">
          <svg class="size-5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          YouTube
        </Link>
      </li>

      <li>
        <Link href="https://www.linkedin.com/in/angel-diaza" class="flex items-center gap-2">
          <svg class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </Link>
      </li>

      <li>
        <Link href="mailto:contact@diaza.dev" class="flex items-center gap-2">
          <Mail strokeWidth={3} size={20} />
          contact@diaza.dev
        </Link>
      </li>
    </ul>
  </section>
</main>