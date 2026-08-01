<script lang="ts">
  import { ArrowLeft } from "lucide-svelte";
  import MarkdownContent from "$lib/components/MarkdownContent.svelte";
  import { formatDateWords } from "$lib/dateUtils";

  let { data } = $props();

  const meta = $derived(data.meta);
</script>

<article class="flex flex-col gap-8">
  <!-- Back to the posts list -->
  <a
    class="group flex w-fit items-center gap-1.5 text-sm font-bold text-zinc-400 transition duration-200 hover:text-zinc-900"
    href="/blog"
  >
    <ArrowLeft class="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
    All posts
  </a>

  <!-- Post header -->
  <header class="flex flex-col">
    <p class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
      {#if meta.creationDate}{formatDateWords(meta.creationDate)}{/if}
      {#if meta.creationDate && meta.categories?.length}<span aria-hidden="true"> · </span>{/if}
      {#if meta.categories?.length}{meta.categories.join(", ")}{/if}
    </p>
    <h1 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
      {meta.title}
    </h1>
    {#if meta.excerpt}
      <p class="mt-4 text-sm leading-relaxed text-zinc-500">
        {meta.excerpt}
      </p>
    {/if}
  </header>

  {#if meta.coverImageUrl}
    <img
      class="rounded-2xl shadow-sm"
      src={meta.coverImageUrl}
      alt="Cover image for {meta.title}"
      allow_enlarge=true
    />
  {/if}

  <!-- RENDERS POST CONTENT FROM MARKDOWN -->
  <MarkdownContent>
    {@render data.content()}
  </MarkdownContent>

  <a
    class="flex items-center gap-1 font-medium transition duration-200 hover:text-zinc-600"
    href="/blog"
  >
    <ArrowLeft class="size-4 shrink-0" aria-hidden="true" /> Back to all posts
  </a>
</article>
