<!-- WYSIWYG body editor. TipTap edits in place inside the site's own post
     styling, so the editing surface is the preview; markdown stays the
     storage format in both directions. -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import ImageExtension from '@tiptap/extension-image';
  import { CharacterCount, Placeholder } from '@tiptap/extensions';
  import { Markdown } from 'tiptap-markdown';
  import {
    Bold,
    Check,
    Code,
    Heading2,
    Heading3,
    ImageIcon,
    Italic,
    Link2,
    List,
    ListOrdered,
    Minus,
    Quote,
    Redo2,
    Undo2,
    X
  } from 'lucide-svelte';
  import MarkdownContent from '$lib/components/MarkdownContent.svelte';
  import type { Snippet } from 'svelte';

  type MarkdownStorage = { markdown: { getMarkdown(): string } };

  let { value = $bindable<string>(''), header }: { value: string; header?: Snippet } = $props();

  let host = $state<HTMLDivElement | null>(null);
  let editor = $state<Editor | null>(null);
  /** Bumped on every transaction so toolbar state re-reads from the editor. */
  let version = $state(0);

  let linkOpen = $state(false);
  let linkUrl = $state('');
  let imageOpen = $state(false);
  let imageSrc = $state('');
  let imageAlt = $state('');

  onMount(() => {
    const instance = new Editor({
      element: host!,
      extensions: [
        StarterKit.configure({
          heading: { levels: [2, 3, 4] },
          link: { openOnClick: false, autolink: true }
        }),
        ImageExtension,
        Placeholder.configure({ placeholder: 'Start writing…' }),
        CharacterCount,
        Markdown.configure({ html: false, transformPastedText: true, transformCopiedText: true })
      ],
      content: value,
      editorProps: { attributes: { class: 'outline-none', 'aria-label': 'Post body' } },
      onUpdate: ({ editor: current }) => {
        // tiptap-markdown adds this at runtime without augmenting Storage's type
        value = (current.storage as unknown as MarkdownStorage).markdown.getMarkdown();
      },
      onTransaction: () => version++
    });

    editor = instance;
    return () => instance.destroy();
  });

  function read<T>(fn: (editor: Editor) => T, fallback: T): T {
    void version;
    return editor ? fn(editor) : fallback;
  }

  const words = $derived(read((e) => e.storage.characterCount.words() as number, 0));
  const canUndo = $derived(read((e) => e.can().undo(), false));
  const canRedo = $derived(read((e) => e.can().redo(), false));

  function chain() {
    return editor?.chain().focus();
  }

  function openLink() {
    linkUrl = String(editor?.getAttributes('link').href ?? '');
    imageOpen = false;
    linkOpen = true;
  }

  function applyLink() {
    const url = linkUrl.trim();
    if (!editor) return;

    if (!url) {
      chain()?.extendMarkRange('link').unsetLink().run();
    } else if (editor.state.selection.empty) {
      chain()
        ?.insertContent({ type: 'text', text: url, marks: [{ type: 'link', attrs: { href: url } }] })
        .run();
    } else {
      chain()?.extendMarkRange('link').setLink({ href: url }).run();
    }
    linkOpen = false;
    linkUrl = '';
  }

  function openImage() {
    imageSrc = '';
    imageAlt = '';
    linkOpen = false;
    imageOpen = true;
  }

  function applyImage() {
    const src = imageSrc.trim();
    if (src) chain()?.setImage({ src, alt: imageAlt.trim() || undefined }).run();
    imageOpen = false;
  }

  const tools = $derived([
    { icon: Bold, label: 'Bold', active: read((e) => e.isActive('bold'), false), run: () => chain()?.toggleBold().run() },
    { icon: Italic, label: 'Italic', active: read((e) => e.isActive('italic'), false), run: () => chain()?.toggleItalic().run() },
    {
      icon: Heading2,
      label: 'Heading',
      active: read((e) => e.isActive('heading', { level: 2 }), false),
      run: () => chain()?.toggleHeading({ level: 2 }).run()
    },
    {
      icon: Heading3,
      label: 'Subheading',
      active: read((e) => e.isActive('heading', { level: 3 }), false),
      run: () => chain()?.toggleHeading({ level: 3 }).run()
    },
    { icon: Link2, label: 'Link', active: read((e) => e.isActive('link'), false), run: openLink },
    { icon: ImageIcon, label: 'Image', active: false, run: openImage },
    {
      icon: List,
      label: 'Bulleted list',
      active: read((e) => e.isActive('bulletList'), false),
      run: () => chain()?.toggleBulletList().run()
    },
    {
      icon: ListOrdered,
      label: 'Numbered list',
      active: read((e) => e.isActive('orderedList'), false),
      run: () => chain()?.toggleOrderedList().run()
    },
    {
      icon: Quote,
      label: 'Quote',
      active: read((e) => e.isActive('blockquote'), false),
      run: () => chain()?.toggleBlockquote().run()
    },
    {
      icon: Code,
      label: 'Code block',
      active: read((e) => e.isActive('codeBlock'), false),
      run: () => chain()?.toggleCodeBlock().run()
    },
    { icon: Minus, label: 'Divider', active: false, run: () => chain()?.setHorizontalRule().run() }
  ]);

  const fieldClass =
    'min-w-0 flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm transition placeholder:text-zinc-300 focus:border-zinc-400 focus:bg-white focus:outline-none';
</script>

<section class="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
  <!-- Toolbar -->
  <div class="flex flex-col gap-2 border-b border-zinc-200 px-2 py-2">
    <div class="flex items-center gap-2">
      <div class="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto">
        {#each tools as tool (tool.label)}
          {@const Icon = tool.icon}
          <button
            type="button"
            class="shrink-0 rounded-lg p-2 transition duration-200 {tool.active
              ? 'bg-zinc-900 text-zinc-50'
              : 'text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900'}"
            onclick={tool.run}
            title={tool.label}
            aria-label={tool.label}
            aria-pressed={tool.active}
          >
            <Icon class="size-4" aria-hidden="true" />
          </button>
        {/each}
      </div>

      <div class="flex shrink-0 items-center gap-0.5 border-l border-zinc-200 pl-1.5">
        <button
          type="button"
          class="rounded-lg p-2 text-zinc-400 transition duration-200 hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-400"
          onclick={() => chain()?.undo().run()}
          disabled={!canUndo}
          title="Undo"
          aria-label="Undo"
        >
          <Undo2 class="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="rounded-lg p-2 text-zinc-400 transition duration-200 hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-400"
          onclick={() => chain()?.redo().run()}
          disabled={!canRedo}
          title="Redo"
          aria-label="Redo"
        >
          <Redo2 class="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>

    {#if linkOpen}
      <div class="flex items-center gap-1.5 px-1 pb-1">
        <!-- svelte-ignore a11y_autofocus -->
        <input
          class={fieldClass}
          type="url"
          bind:value={linkUrl}
          placeholder="https://…  (leave empty to remove)"
          autocapitalize="none"
          autocomplete="off"
          autofocus
          onkeydown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              applyLink();
            } else if (event.key === 'Escape') linkOpen = false;
          }}
          aria-label="Link URL"
        />
        <button type="button" class="rounded-lg bg-zinc-900 p-2 text-zinc-50 transition hover:bg-zinc-800" onclick={applyLink} aria-label="Apply link">
          <Check class="size-4" aria-hidden="true" />
        </button>
        <button type="button" class="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900" onclick={() => (linkOpen = false)} aria-label="Cancel">
          <X class="size-4" aria-hidden="true" />
        </button>
      </div>
    {/if}

    {#if imageOpen}
      <div class="flex flex-col gap-1.5 px-1 pb-1 sm:flex-row sm:items-center">
        <!-- svelte-ignore a11y_autofocus -->
        <input
          class={fieldClass}
          type="text"
          bind:value={imageSrc}
          placeholder="/img/blog/…"
          autocapitalize="none"
          autocomplete="off"
          autofocus
          aria-label="Image path"
        />
        <div class="flex items-center gap-1.5">
          <input class={fieldClass} type="text" bind:value={imageAlt} placeholder="Alt text" aria-label="Image alt text" />
          <button type="button" class="rounded-lg bg-zinc-900 p-2 text-zinc-50 transition hover:bg-zinc-800" onclick={applyImage} aria-label="Insert image">
            <Check class="size-4" aria-hidden="true" />
          </button>
          <button type="button" class="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900" onclick={() => (imageOpen = false)} aria-label="Cancel">
            <X class="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    {/if}
  </div>

  <!-- Canvas: same width and styling as the published page -->
  <div class="h-[60vh] min-h-80 overflow-y-auto bg-zinc-50/50 px-5 py-8 sm:px-8 sm:py-10 lg:h-[68vh]">
    <div class="mx-auto w-full max-w-xl">
      {#if header}
        <div class="mb-8">{@render header()}</div>
      {/if}
      <MarkdownContent>
        <div bind:this={host}></div>
      </MarkdownContent>
    </div>
  </div>

  <div class="flex items-center justify-between border-t border-zinc-200 px-4 py-2 text-xs text-zinc-400">
    <span>{words} {words === 1 ? 'word' : 'words'}</span>
    <span class="hidden sm:inline">Rich text · saved as markdown</span>
  </div>
</section>

<style>
  /* ProseMirror's own chrome; the prose styling itself comes from MarkdownContent */
  :global(.ProseMirror) {
    outline: none;
    min-height: 12rem;
  }

  :global(.ProseMirror p.is-editor-empty:first-child::before) {
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
    color: #d4d4d8; /* zinc-300 */
  }

  :global(.ProseMirror .ProseMirror-selectednode) {
    outline: 2px solid #18181b; /* zinc-900 */
    outline-offset: 2px;
  }
</style>
