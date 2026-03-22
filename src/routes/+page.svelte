<script>
  import { getTimeBasedQuote } from '$lib/quotes';
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
    <h1 class="text-5xl sm:text-6xl font-bold">Hello! I'm Angel Diaz.</h1>
    <p class="text-lg text-gray-600 mt-4">I'm a software engineer based in Puerto Rico. Welcome to my corner of the internet!</p>
    <!-- Current Status -->
    <div class="w-full bg-gray-900 text-white p-4 mt-8 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1 text-center" aria-label="Current Status">
      
      <h2 class="font-bold uppercase text-lg">Status Update<span class="ml-2"></span></h2>
      <!-- TODO: For longer statuses, scrolling news update style -->
      <p class="">{statusData.status}</p>
      <span class="text-gray-300 text-xs uppercase">Last Updated: {statusData.lastUpdated}</span>
    </div>
  </section>
  
  <!-- Quote Section -->
  <section class="flex flex-col mt-8" aria-label="Quote Section">
    <h2 class="font-bold uppercase text-xl">Inspirational Quote</h2>
    <blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-700 mt-2">
      "{getTimeBasedQuote().quote}"<br>
      <span class="text-gray-400 text-xs uppercase">— {getTimeBasedQuote().author}</span>
    </blockquote>
    
  </section>

  <!-- Recent Projects Section -->

  <!-- Recent Posts Section -->

  <!-- Guestbook Section -->

  <!-- Recent Photos Section -->
</main>
