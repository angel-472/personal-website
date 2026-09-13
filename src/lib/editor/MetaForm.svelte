<!-- Frontmatter editor. Every control is driven by the field list in schema.ts,
     so adding a metadata key to the site means adding one entry there. -->
<script lang="ts">
  import ChipInput from './ChipInput.svelte';
  import ImageInput from './ImageInput.svelte';
  import type { DocKind } from './schema';
  import type { Meta } from './frontmatter';

  let {
    kind,
    meta = $bindable<Meta>({}),
    slug = $bindable<string>(''),
    slugError = '',
    onslugedit
  }: {
    kind: DocKind;
    meta: Meta;
    slug: string;
    slugError?: string;
    onslugedit?: () => void;
  } = $props();

  const inputClass =
    'w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-sm transition placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:border-zinc-400 dark:focus:border-zinc-600 focus:bg-white dark:focus:bg-zinc-700 focus:outline-none';
</script>

<aside
  class="flex flex-col gap-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
>
  <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
    {kind.label} details
  </h2>

  <!-- Filename -->
  <div class="flex flex-col gap-1.5">
    <label class="text-xs font-bold text-zinc-700 dark:text-zinc-300" for="field-slug">
      Filename
      <span class="text-zinc-300 dark:text-zinc-600">*</span>
    </label>
    <div class="flex items-center gap-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 pr-3 transition focus-within:border-zinc-400 dark:focus-within:border-zinc-600 focus-within:bg-white dark:focus-within:bg-zinc-700">
      <input
        id="field-slug"
        class="min-w-0 flex-1 rounded-xl bg-transparent px-3 py-2 text-sm transition placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:outline-none"
        type="text"
        bind:value={slug}
        oninput={onslugedit}
        placeholder="my-{kind.id}"
        autocapitalize="none"
        autocomplete="off"
        spellcheck="false"
      />
      <span class="shrink-0 text-xs text-zinc-400 dark:text-zinc-500">.md</span>
    </div>
    {#if slugError}
      <p class="text-xs font-bold text-red-500 dark:text-red-400">{slugError}</p>
    {:else}
      <p class="text-xs text-zinc-400 dark:text-zinc-500">Saved to {kind.dir}/{slug || '…'}.md</p>
    {/if}
  </div>

  {#each kind.fields as field (field.key)}
    {@const id = `field-${field.key}`}
    <div class="flex flex-col gap-1.5">
      {#if field.type === 'boolean'}
        <div class="flex items-center justify-between gap-3">
          <span class="text-xs font-bold text-zinc-700 dark:text-zinc-300" id="{id}-label">{field.label}</span>
          <button
            type="button"
            role="switch"
            aria-checked={meta[field.key] === true}
            aria-labelledby="{id}-label"
            class="relative h-6 w-11 shrink-0 rounded-full transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 focus-visible:ring-offset-2 {meta[
              field.key
            ] === true
              ? 'bg-zinc-900 dark:bg-zinc-100'
              : 'bg-zinc-200 dark:bg-zinc-700'}"
            onclick={() => (meta[field.key] = meta[field.key] !== true)}
          >
            <span
              class="absolute top-0.5 size-5 rounded-full bg-white dark:bg-zinc-900 shadow-sm transition-all duration-200 {meta[
                field.key
              ] === true
                ? 'left-[1.375rem]'
                : 'left-0.5'}"
            ></span>
          </button>
        </div>
      {:else}
        <label class="text-xs font-bold text-zinc-700 dark:text-zinc-300" for={id}>
          {field.label}
          {#if field.required}<span class="text-zinc-300 dark:text-zinc-600">*</span>{/if}
        </label>

        {#if field.type === 'textarea'}
          <textarea
            {id}
            class="{inputClass} min-h-20 resize-y leading-relaxed"
            bind:value={meta[field.key] as string}
            placeholder={field.placeholder}
          ></textarea>
        {:else if field.type === 'chips'}
          <ChipInput {id} bind:value={meta[field.key] as string[]} placeholder={field.placeholder} />
        {:else if field.type === 'images'}
          <ImageInput
            {id}
            bind:value={meta[field.key] as string | string[]}
            multiple={field.key === 'images'}
            placeholder={field.placeholder ?? '/img/…'}
          />
        {:else if field.type === 'number'}
          <input {id} class={inputClass} type="number" bind:value={meta[field.key] as number} />
        {:else if field.type === 'date'}
          <input {id} class={inputClass} type="date" bind:value={meta[field.key] as string} />
        {:else}
          <input
            {id}
            class={inputClass}
            type={field.type === 'url' ? 'url' : 'text'}
            bind:value={meta[field.key] as string}
            placeholder={field.placeholder}
            autocapitalize={field.type === 'url' ? 'none' : 'sentences'}
            autocomplete="off"
          />
        {/if}
      {/if}

      {#if field.help}
        <p class="text-xs text-zinc-400 dark:text-zinc-500">{field.help}</p>
      {/if}
    </div>
  {/each}
</aside>
