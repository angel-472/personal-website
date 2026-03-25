<script>
  import { getTimeBasedQuote } from '$lib/quotes';
  import Link from '$lib/components/Link.svelte';
  let statusData = {
    status: "Working on this site you're on right now! Expect new content and projects soon.",
    lastUpdated: "2026-MAR-16"
  }

</script>

<svelte:head>
  <title>Home - Diaza</title>
  <meta name="description" content="Thoughts, tutorials, and musings on software development, technology, and life." />
</svelte:head>

<main aria-label="Home page" class="w-full flex flex-col gap-8">
  <!-- Hero Section -->
  <section class="flex flex-col" aria-label="Hero Section">
    <h1 class="text-5xl sm:text-6xl font-bold">Hello! I'm <span class="text-cyan-100">Angel Diaz</span>.</h1>
    <p class="text-lg text-zinc-400 mt-4">I'm a software engineer based in Puerto Rico. Welcome to my corner of the internet!</p>
    <!-- Current Status -->
    <div class="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 p-4 mt-8 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1 text-center rounded-lg" aria-label="Current Status">
      
      <!-- Link styling example -->
      <Link href="/now" isUnderlined="true">
        <h2 class="font-bold uppercase text-lg">Status Update</h2>
      </Link>
      
      <!-- TODO: For longer statuses, scrolling news update style -->
      <p class="text-zinc-300">{statusData.status}</p>
      <span class="text-zinc-400 text-xs uppercase font-mono">Last Updated: {statusData.lastUpdated}</span>
    </div>
  </section>

  <!-- Featured Projects Section -->
  <section class="flex flex-col mt-8" aria-label="Featured Projects">
    <h2 class="font-bold uppercase text-xl text-zinc-100">Featured Projects</h2>
  </section>

  <!-- Recent PostsSection -->
  <section class="flex flex-col mt-8" aria-label="Featured Projects">
    <h2 class="font-bold uppercase text-xl text-zinc-100">Recent Posts</h2>
  </section>
  
  <!-- Quote Section -->
  <section class="flex flex-col mt-8" aria-label="Quote Section">
    <h2 class="font-bold uppercase text-xl text-zinc-100">Inspirational Quote</h2>
    <blockquote class="border-l-4 border-zinc-400 pl-4 italic text-zinc-300 mt-2">
      "{getTimeBasedQuote().quote}"<br>
      <span class="text-zinc-400 text-xs uppercase font-mono mt-2 inline-block">— {getTimeBasedQuote().author}</span>
    </blockquote>
    
  </section>

  <!-- Recent Projects Section -->

  <!-- Recent Posts Section -->

  <!-- Guestbook Section -->

  <!-- Recent Photos Section -->
</main>
