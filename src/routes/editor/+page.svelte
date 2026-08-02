<!-- Local authoring tool for the markdown files in src/projects and src/posts.
     Everything runs in the browser: pick or start a file, edit it, export it,
     then drop the download into the repo. -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowLeft, Check, Copy, Download, FileText, Layers, Pencil, Plus, X } from 'lucide-svelte';
  import DocHeader from '$lib/editor/DocHeader.svelte';
  import MetaForm from '$lib/editor/MetaForm.svelte';
  import RichTextEditor from '$lib/editor/RichTextEditor.svelte';
  import { serializeDocument } from '$lib/editor/frontmatter';
  import {
    KINDS,
    KIND_LIST,
    createDoc,
    docTitle,
    orderedMeta,
    slugify,
    type DocKindId,
    type EditorDoc
  } from '$lib/editor/schema';
  import { formatRelativeTime } from '$lib/dateUtils';

  let { data } = $props();

  const DRAFT_KEY = 'diaza-editor-draft-v1';

  let tab = $state<DocKindId>('project');
  let doc = $state<EditorDoc | null>(null);
  let slugTouched = $state(false);
  let draft = $state<EditorDoc | null>(null);
  let copyState = $state<'idle' | 'copied' | 'failed'>('idle');
  let exported = $state('');
  /** Incremented whenever a different file is opened, to remount the editor. */
  let session = $state(0);

  const kind = $derived(KINDS[doc?.kind ?? tab]);
  const heading = $derived(doc ? docTitle(doc) : '');

  const listed = $derived(
    data.docs
      .filter((entry) => entry.kind === tab)
      .sort((a, b) =>
        tab === 'post'
          ? String(b.meta.creationDate ?? '').localeCompare(String(a.meta.creationDate ?? ''))
          : Number(b.meta.priority ?? 0) - Number(a.meta.priority ?? 0)
      )
  );

  const slugError = $derived.by(() => {
    if (!doc) return '';
    if (!doc.slug.trim()) return 'A filename is required.';
    if (!/^[a-z0-9-]+$/.test(doc.slug)) return 'Use lowercase letters, numbers and dashes only.';
    return '';
  });

  const titleMissing = $derived(Boolean(doc) && !docTitleValue());
  const canExport = $derived(Boolean(doc) && !slugError && !titleMissing);
  const output = $derived(doc ? serializeDocument(orderedMeta(doc), doc.body) : '');

  function docTitleValue() {
    if (!doc) return '';
    return String(doc.meta[KINDS[doc.kind].titleKey] ?? '').trim();
  }

  // New files get their filename from the title until the filename is edited by hand
  $effect(() => {
    if (!doc || doc.sourceSlug || slugTouched) return;
    doc.slug = slugify(String(doc.meta[KINDS[doc.kind].titleKey] ?? ''));
  });

  // Keep whatever is open in localStorage so a refresh doesn't lose the work
  $effect(() => {
    if (!doc) return;
    const payload = JSON.stringify($state.snapshot(doc));
    const timer = setTimeout(() => localStorage.setItem(DRAFT_KEY, payload), 400);
    return () => clearTimeout(timer);
  });

  onMount(() => {
    const stored = localStorage.getItem(DRAFT_KEY);
    if (!stored) return;
    try {
      draft = JSON.parse(stored) as EditorDoc;
    } catch {
      localStorage.removeItem(DRAFT_KEY);
    }
  });

  function open(entry: EditorDoc) {
    doc = structuredClone($state.snapshot(entry)) as EditorDoc;
    slugTouched = true;
    exported = '';
    session++;
  }

  function create() {
    doc = createDoc(tab);
    slugTouched = false;
    exported = '';
    session++;
  }

  function close() {
    if (doc) draft = structuredClone($state.snapshot(doc)) as EditorDoc;
    doc = null;
    exported = '';
  }

  function resumeDraft() {
    if (!draft) return;
    doc = structuredClone($state.snapshot(draft)) as EditorDoc;
    slugTouched = true;
    session++;
  }

  function discardDraft() {
    localStorage.removeItem(DRAFT_KEY);
    draft = null;
  }

  function exportFile() {
    if (!doc || !canExport) return;
    const filename = `${doc.slug}.md`;
    const blob = new Blob([output], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    exported = filename;
  }

  async function copyMarkdown() {
    if (!doc) return;
    copyState = (await writeToClipboard(output)) ? 'copied' : 'failed';
    setTimeout(() => (copyState = 'idle'), 2000);
  }

  async function writeToClipboard(text: string): Promise<boolean> {
    // navigator.clipboard only exists in secure contexts, so it's missing when
    // the dev server is opened over the LAN (http://10.x.x.x) from a phone.
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // Denied or unavailable — fall through to the selection-based copy
      }
    }
    return legacyCopy(text);
  }

  function legacyCopy(text: string): boolean {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
    document.body.appendChild(area);

    const selection = document.getSelection();
    const previous = selection && selection.rangeCount ? selection.getRangeAt(0) : null;

    // iOS ignores select() on a readonly textarea, so select a range instead
    if (/iP(ad|hone|od)/.test(navigator.userAgent)) {
      area.contentEditable = 'true';
      const range = document.createRange();
      range.selectNodeContents(area);
      selection?.removeAllRanges();
      selection?.addRange(range);
    } else {
      area.select();
    }
    area.setSelectionRange(0, text.length);

    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }

    area.remove();
    if (previous && selection) {
      selection.removeAllRanges();
      selection.addRange(previous);
    }
    return ok;
  }

  function onkeydown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
      event.preventDefault();
      exportFile();
    }
  }

  function summary(entry: EditorDoc) {
    const value = entry.kind === 'post' ? entry.meta.excerpt : entry.meta.description;
    return String(value ?? '');
  }

  function badge(entry: EditorDoc) {
    if (entry.kind === 'post') {
      const date = String(entry.meta.creationDate ?? '');
      if (entry.meta.published === false) return 'Draft';
      return date ? formatRelativeTime(date) : '';
    }
    return String(entry.meta.lang ?? '');
  }
</script>

<svelte:head>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<svelte:window {onkeydown} />

{#if !doc}
  <!-- Library -->
  <div class="flex flex-col gap-6">
    <header class="flex flex-col">
      <p class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Content editor</p>
      <h1 class="mt-2 text-2xl font-bold sm:text-3xl">Projects &amp; posts</h1>
      <p class="mt-2 max-w-md text-sm leading-relaxed text-zinc-500">
        Edit an existing file or start a new one, then export the markdown into the repo.
      </p>
    </header>

    {#if draft}
      <div class="flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-900 bg-zinc-900 px-5 py-4 text-zinc-50 shadow-sm">
        <div class="min-w-0 flex-1">
          <p class="text-sm font-bold">Unsaved draft</p>
          <p class="truncate text-xs text-zinc-400">
            {KINDS[draft.kind].label} · {docTitle(draft)}
          </p>
        </div>
        <button
          type="button"
          class="shrink-0 rounded-xl bg-zinc-50 px-3 py-2 text-xs font-bold text-zinc-900 transition duration-200 hover:bg-white"
          onclick={resumeDraft}
        >
          Continue
        </button>
        <button
          type="button"
          class="shrink-0 rounded-xl p-2 text-zinc-400 transition duration-200 hover:bg-zinc-800 hover:text-zinc-50"
          onclick={discardDraft}
          aria-label="Discard draft"
        >
          <X class="size-4" aria-hidden="true" />
        </button>
      </div>
    {/if}

    <!-- Kind switcher -->
    <nav aria-label="Content type" class="grid grid-cols-2 gap-1 rounded-2xl bg-zinc-200/70 p-1">
      {#each KIND_LIST as option (option.id)}
        <button
          type="button"
          class="rounded-xl border px-4 py-2.5 text-center text-sm font-bold transition duration-200 {tab === option.id
            ? 'border-zinc-200 bg-white text-zinc-900 shadow-sm'
            : 'border-transparent text-zinc-400 hover:text-zinc-600'}"
          onclick={() => (tab = option.id)}
          aria-pressed={tab === option.id}
        >
          {option.plural}
        </button>
      {/each}
    </nav>

    <div class="flex flex-col gap-3">
      <button
        type="button"
        class="group flex items-center gap-4 rounded-2xl border border-dashed border-zinc-300 px-5 py-4 text-left transition duration-200 hover:border-zinc-900 hover:bg-white"
        onclick={create}
      >
        <Plus class="size-5 shrink-0 text-zinc-400 transition-colors duration-200 group-hover:text-zinc-900" aria-hidden="true" />
        <span class="flex-1 text-sm font-bold text-zinc-500 transition-colors duration-200 group-hover:text-zinc-900">
          New {KINDS[tab].label.toLowerCase()}
        </span>
      </button>

      {#each listed as entry (entry.slug)}
        {@const Icon = entry.kind === 'post' ? FileText : Layers}
        {@const note = badge(entry)}
        <button
          type="button"
          class="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-zinc-900 hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100"
          onclick={() => open(entry)}
        >
          <Icon class="size-5 shrink-0 text-zinc-900 transition-colors duration-200 group-hover:text-zinc-50" aria-hidden="true" />
          <span class="min-w-0 flex-1">
            <span class="block truncate text-sm font-bold text-zinc-900 transition-colors duration-200 group-hover:text-zinc-50">
              {docTitle(entry)}
            </span>
            {#if summary(entry)}
              <span class="mt-0.5 block truncate text-xs text-zinc-400 transition-colors duration-200 group-hover:text-zinc-500">
                {summary(entry)}
              </span>
            {/if}
          </span>
          {#if note}
            <span class="hidden shrink-0 text-xs text-zinc-400 transition-colors duration-200 group-hover:text-zinc-500 sm:inline">
              {note}
            </span>
          {/if}
          <Pencil class="size-4 shrink-0 text-zinc-300 transition-colors duration-200 group-hover:text-zinc-50" aria-hidden="true" />
        </button>
      {:else}
        <p class="rounded-2xl border border-dashed border-zinc-300 px-5 py-8 text-center text-sm text-zinc-400">
          No {KINDS[tab].plural.toLowerCase()} yet.
        </p>
      {/each}
    </div>
  </div>
{:else}
  <!-- Editor -->
  <div class="flex flex-col gap-6">
    <div class="sticky top-4 z-20 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white/90 px-3 py-3 shadow-sm backdrop-blur sm:px-4">
      <button
        type="button"
        class="shrink-0 rounded-xl p-2 text-zinc-400 transition duration-200 hover:bg-zinc-100 hover:text-zinc-900"
        onclick={close}
        aria-label="Back to all files"
      >
        <ArrowLeft class="size-5" aria-hidden="true" />
      </button>

      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-bold">{heading}</p>
        <p class="truncate text-xs text-zinc-400">{kind.dir}/{doc.slug || '…'}.md</p>
      </div>

      <button
        type="button"
        class="shrink-0 rounded-xl border p-2 transition duration-200 sm:px-3 {copyState === 'failed'
          ? 'border-red-300 text-red-500'
          : 'border-zinc-200 text-zinc-500 hover:border-zinc-900 hover:text-zinc-900'}"
        onclick={copyMarkdown}
        aria-label="Copy markdown"
        title={copyState === 'failed' ? 'Copying was blocked — use Export instead' : 'Copy markdown'}
      >
        <span class="flex items-center gap-1.5">
          {#if copyState === 'copied'}
            <Check class="size-4" aria-hidden="true" />
          {:else if copyState === 'failed'}
            <X class="size-4" aria-hidden="true" />
          {:else}
            <Copy class="size-4" aria-hidden="true" />
          {/if}
          <span class="hidden text-xs font-bold sm:inline">
            {copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Blocked' : 'Copy'}
          </span>
        </span>
      </button>

      <button
        type="button"
        class="shrink-0 rounded-xl bg-zinc-900 p-2 text-zinc-50 shadow-sm transition duration-200 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 sm:px-3"
        onclick={exportFile}
        disabled={!canExport}
        title="Export markdown file (⌘S)"
      >
        <span class="flex items-center gap-1.5">
          <Download class="size-4" aria-hidden="true" />
          <span class="hidden text-xs font-bold sm:inline">Export</span>
        </span>
      </button>
    </div>

    {#if titleMissing || slugError}
      <p class="-mt-2 text-xs font-bold text-red-500">
        {titleMissing ? `A ${kind.titleKey} is required before exporting.` : slugError}
      </p>
    {:else if exported}
      <p class="-mt-2 text-xs text-zinc-500">
        Downloaded <span class="font-bold">{exported}</span> — move it into
        <span class="font-bold">{kind.dir}/</span> to publish it.
      </p>
    {/if}

    <div class="grid items-start gap-6 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)]">
      <MetaForm {kind} bind:meta={doc.meta} bind:slug={doc.slug} {slugError} onslugedit={() => (slugTouched = true)} />

      <!-- Keyed so opening another file gives TipTap a fresh instance rather
           than fighting the editor's own document state. -->
      {#key session}
        <RichTextEditor bind:value={doc.body}>
          {#snippet header()}
            <!-- Inside a snippet TS loses the `doc` narrowing from the branch above -->
            <DocHeader kind={doc!.kind} meta={doc!.meta} body={doc!.body} />
          {/snippet}
        </RichTextEditor>
      {/key}
    </div>
  </div>
{/if}
