<script lang="ts">
  import { ArrowRight, ArrowUpRight, FileText } from "lucide-svelte";
  import { formatDateShort } from "$lib/dateUtils";

  let { data } = $props();

  // The newest post gets the big card; everything else stacks under "Earlier".
  const featured = $derived(data.posts[0]);
  const earlier = $derived(data.posts.slice(1));

</script>

<!-- Posts -->
<section id="posts" aria-labelledby="posts-heading" class="flex flex-col gap-6">
  <h2 id="posts-heading" class="sr-only">Blog posts</h2>

  {#if featured}
    <!-- Latest post -->
    <a
      class="group block overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-100 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950"
      href="/blog/{featured.slug}"
    >
      {#if featured.coverImageUrl}
        <div class="aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <img
            class="size-full object-cover transition duration-300"
            src={featured.coverImageUrl}
            alt="Cover image for {featured.title}"
          />
        </div>
      {/if}

      <div class="flex flex-col p-5">
        <div class="flex items-center gap-2.5">
          <span class="rounded-full bg-zinc-900 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
            Latest
          </span>
          <span class="text-xs text-zinc-400 dark:text-zinc-500">
            {#if featured.creationDate}{formatDateShort(featured.creationDate)}<span class="px-1" aria-hidden="true">·</span>{/if}{featured.readTime} min read
          </span>
        </div>

        <h3 class="mt-3 text-lg font-bold leading-snug text-zinc-900 dark:text-zinc-100">
          {featured.title}
        </h3>
        {#if featured.excerpt}
          <p class="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {featured.excerpt}
          </p>
        {/if}

        <div class="mt-4 flex items-end justify-between gap-3">
          <div class="flex flex-wrap gap-1.5">
            {#each featured.categories ?? [] as category (category)}
              <span class="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                {category}
              </span>
            {/each}
          </div>
          <span class="flex shrink-0 items-center gap-1 text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Read
            <ArrowRight class="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </a>

    {#if earlier.length}
      <!-- Older posts -->
      <div class="flex flex-col gap-3">
        <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">Earlier</h3>

        {#each earlier as post (post.slug)}
          <a
            class="group flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-100 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950"
            href="/blog/{post.slug}"
          >
            {#if post.coverImageUrl}
              <img
                class="size-14 shrink-0 rounded-xl bg-zinc-100 object-cover dark:bg-zinc-800"
                src={post.coverImageUrl}
                alt="Cover image for {post.title}"
                loading="lazy"
              />
            {:else}
              <span class="flex size-14 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800" aria-hidden="true">
                <FileText class="size-5 text-zinc-400 dark:text-zinc-500" />
              </span>
            {/if}

            <div class="min-w-0 flex-1">
              <p class="text-sm font-bold leading-snug text-zinc-900 dark:text-zinc-100">{post.title}</p>
              {#if post.excerpt}
                <p class="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{post.excerpt}</p>
              {/if}
              <p class="mt-1.5 text-xs text-zinc-400 dark:text-zinc-500">
                {#if post.creationDate}{formatDateShort(post.creationDate)}<span class="px-1" aria-hidden="true">·</span>{/if}{post.readTime} min read
              </p>
            </div>

            <ArrowUpRight class="size-4 shrink-0 text-zinc-300 transition-colors duration-200 group-hover:text-zinc-900 dark:text-zinc-600 dark:group-hover:text-zinc-100" aria-hidden="true" />
          </a>
        {/each}
      </div>
    {/if}
  {:else}
    <p class="rounded-2xl border border-dashed border-zinc-300 px-5 py-8 text-center text-sm text-zinc-400 dark:border-zinc-700 dark:text-zinc-500">
      No posts yet. Check back soon.
    </p>
  {/if}
</section>
