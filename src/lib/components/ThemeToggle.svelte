<!-- Light/dark switcher. Pinned to the top-right corner of every page so it
     stays out of the reading column. -->
<script lang="ts">
  import { Moon, Sun } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { theme } from '$lib/theme.svelte';

  onMount(() => theme.followSystem());
</script>

<button
  type="button"
  class="group absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-zinc-900 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100 sm:right-6 sm:top-6 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-100 dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950"
  onclick={() => theme.toggle()}
  aria-pressed={theme.isDark}
  aria-label="Switch to {theme.isDark ? 'light' : 'dark'} mode"
  title="Switch to {theme.isDark ? 'light' : 'dark'} mode"
>
  <!-- Both icons are always mounted and cross-faded, so the button never
       reflows and the swap reads as one motion. -->
  <span class="relative block size-5">
    <Sun
      class="absolute inset-0 size-5 transition-all duration-300 {theme.isDark
        ? 'rotate-90 scale-50 opacity-0'
        : 'rotate-0 scale-100 opacity-100'}"
      aria-hidden="true"
    />
    <Moon
      class="absolute inset-0 size-5 transition-all duration-300 {theme.isDark
        ? 'rotate-0 scale-100 opacity-100'
        : '-rotate-90 scale-50 opacity-0'}"
      aria-hidden="true"
    />
  </span>
</button>
