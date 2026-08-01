<!-- Image path input. Handles both the single cover image on posts and the
     ordered list of screenshots on projects, with a thumbnail so typos show up. -->
<script lang="ts">
  import { ChevronDown, ChevronUp, ImageIcon, Plus, Trash2 } from 'lucide-svelte';

  let {
    value = $bindable<string | string[]>(''),
    id,
    multiple = false,
    placeholder = '/img/…'
  }: { value: string | string[]; id: string; multiple?: boolean; placeholder?: string } = $props();

  const items = $derived(multiple ? ((value as string[]) ?? []) : []);

  function update(index: number, next: string) {
    value = items.map((item, i) => (i === index ? next : item));
  }

  function addRow() {
    value = [...items, ''];
  }

  function remove(index: number) {
    value = items.filter((_, i) => i !== index);
  }

  function move(index: number, delta: number) {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    value = next;
  }
</script>

{#snippet thumbnail(src: string)}
  <span
    class="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100"
  >
    {#if src}
      <img class="size-full object-cover" src={src} alt="" />
    {:else}
      <ImageIcon class="size-4 text-zinc-300" aria-hidden="true" />
    {/if}
  </span>
{/snippet}

{#if multiple}
  <div class="flex flex-col gap-2">
    {#each items as item, index (index)}
      <div class="flex items-center gap-1.5">
        {@render thumbnail(item)}
        <input
          id={index === 0 ? id : undefined}
          class="min-w-0 flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm transition placeholder:text-zinc-300 focus:border-zinc-400 focus:bg-white focus:outline-none"
          type="text"
          value={item}
          oninput={(event) => update(index, event.currentTarget.value)}
          {placeholder}
          autocapitalize="none"
          autocomplete="off"
          aria-label="Image {index + 1} path"
        />
        <div class="flex shrink-0 flex-col">
          <button
            type="button"
            class="rounded-md p-0.5 text-zinc-300 transition hover:text-zinc-900 disabled:opacity-30 disabled:hover:text-zinc-300"
            onclick={() => move(index, -1)}
            disabled={index === 0}
            aria-label="Move image {index + 1} up"
          >
            <ChevronUp class="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="rounded-md p-0.5 text-zinc-300 transition hover:text-zinc-900 disabled:opacity-30 disabled:hover:text-zinc-300"
            onclick={() => move(index, 1)}
            disabled={index === items.length - 1}
            aria-label="Move image {index + 1} down"
          >
            <ChevronDown class="size-4" aria-hidden="true" />
          </button>
        </div>
        <button
          type="button"
          class="shrink-0 rounded-lg p-2 text-zinc-300 transition hover:bg-zinc-100 hover:text-zinc-900"
          onclick={() => remove(index)}
          aria-label="Remove image {index + 1}"
        >
          <Trash2 class="size-4" aria-hidden="true" />
        </button>
      </div>
    {/each}

    <button
      type="button"
      class="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-zinc-300 px-3 py-2 text-xs font-bold text-zinc-400 transition hover:border-zinc-900 hover:text-zinc-900"
      onclick={addRow}
    >
      <Plus class="size-4" aria-hidden="true" />
      Add image
    </button>
  </div>
{:else}
  <div class="flex items-center gap-2">
    {@render thumbnail(value as string)}
    <input
      {id}
      class="min-w-0 flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm transition placeholder:text-zinc-300 focus:border-zinc-400 focus:bg-white focus:outline-none"
      type="text"
      bind:value
      {placeholder}
      autocapitalize="none"
      autocomplete="off"
    />
  </div>
{/if}
