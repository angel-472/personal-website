<!-- The non-editable chrome around the body, mirroring how the doc actually
     renders on the site: /blog/[slug] for posts, ProjectSheet for projects. -->
<script lang="ts">
  import { ArrowUpRight, Github } from 'lucide-svelte';
  import { formatDateWords } from '$lib/dateUtils';
  import type { Meta } from './frontmatter';
  import type { DocKindId } from './schema';

  let { kind, meta }: { kind: DocKindId; meta: Meta } = $props();

  const categories = $derived(Array.isArray(meta.categories) ? (meta.categories as string[]) : []);
  const images = $derived(Array.isArray(meta.images) ? (meta.images as string[]).filter(Boolean) : []);
  const date = $derived(meta.creationDate ? formatDateWords(String(meta.creationDate)) : '');
</script>

{#if kind === 'post'}
  <header class="flex flex-col">
    {#if date || categories.length}
      <p class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
        {date}
        {#if date && categories.length}<span aria-hidden="true"> · </span>{/if}
        {categories.join(', ')}
      </p>
    {/if}
    <h1 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
      {String(meta.title ?? '').trim() || 'Untitled post'}
    </h1>
    {#if meta.excerpt}
      <p class="mt-4 text-sm leading-relaxed text-zinc-500">{meta.excerpt}</p>
    {/if}
  </header>
  {#if meta.coverImageUrl}
    <img class="mt-8 rounded-2xl shadow-sm" src={String(meta.coverImageUrl)} alt="" />
  {/if}
{:else}
  <header class="flex flex-col">
    <h1 class="text-4xl font-bold">{String(meta.name ?? '').trim() || 'Untitled project'}</h1>
    {#if meta.demo || meta.github}
      <div class="flex gap-4">
        {#if meta.demo}
          <span class="mt-2 flex items-center gap-2 font-medium">
            <ArrowUpRight size={16} aria-hidden="true" />Demo
          </span>
        {/if}
        {#if meta.github}
          <span class="mt-2 flex items-center gap-2 font-medium">
            <Github size={16} aria-hidden="true" />GitHub
          </span>
        {/if}
      </div>
    {/if}
  </header>
  {#each images as src (src)}
    <img class="my-8 rounded-2xl shadow-sm" {src} alt="" />
  {/each}
{/if}
