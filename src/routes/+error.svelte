<script lang="ts">
  import { page } from '$app/state';
  import { ArrowLeft } from 'lucide-svelte';

  const is404 = $derived(page.status === 404);
</script>

<section class="flex flex-col items-center text-center">
  <p class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
    Error {page.status}
  </p>
  <h1 class="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
    {is404 ? 'Page not found' : 'Something went wrong'}
  </h1>
  <p class="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
    {#if is404}
      The page you're looking for doesn't exist or may have been moved.
    {:else}
      An unexpected error occurred. Please try again in a moment.
    {/if}
  </p>
</section>

<a
  class="group flex items-center gap-4 rounded-2xl bg-zinc-900 px-5 py-4 text-zinc-50 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100"
  href="/"
>
  <ArrowLeft class="size-5 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
  <span class="flex-1 text-left text-sm font-bold">Back to home</span>
</a>
