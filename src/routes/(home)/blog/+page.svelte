<script lang="ts">
  import { ArrowUpRight, FileText } from "lucide-svelte";
  import { formatRelativeTime } from "$lib/dateUtils";

  let { data } = $props();
</script>

<!-- Posts -->
<section id="posts" aria-labelledby="posts-heading" class="flex flex-col gap-3">
  <h2 id="posts-heading" class="sr-only">Blog posts</h2>

  {#each data.posts as post (post.slug)}
    <a
      class="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-zinc-900 hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100"
      href="/blog/{post.slug}"
    >
      <FileText class="size-5 shrink-0 text-zinc-900 transition-colors duration-200 group-hover:text-zinc-50" aria-hidden="true" />
      <span class="flex-1 text-left text-sm font-bold text-zinc-900 transition-colors duration-200 group-hover:text-zinc-50">
        {post.title}
      </span>
      {#if post.creationDate}
        <span class="hidden shrink-0 text-xs text-zinc-400 transition-colors duration-200 group-hover:text-zinc-500 sm:inline">
          {formatRelativeTime(post.creationDate)}
        </span>
      {/if}
      <ArrowUpRight class="size-4 shrink-0 text-zinc-300 transition-colors duration-200 group-hover:text-zinc-50" aria-hidden="true" />
    </a>
  {:else}
    <p class="rounded-2xl border border-dashed border-zinc-300 px-5 py-8 text-center text-sm text-zinc-400">
      No posts yet. Check back soon.
    </p>
  {/each}
</section>
