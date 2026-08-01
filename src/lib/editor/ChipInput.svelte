<!-- Tag/category input: type and press Enter (or tap +) to add, X to remove -->
<script lang="ts">
  import { Plus, X } from 'lucide-svelte';

  let {
    value = $bindable<string[]>([]),
    id,
    placeholder = 'Add…'
  }: { value: string[]; id: string; placeholder?: string } = $props();

  let draft = $state('');

  function add() {
    const next = draft.trim();
    draft = '';
    if (!next || value.includes(next)) return;
    value = [...value, next];
  }

  function remove(item: string) {
    value = value.filter((entry) => entry !== item);
  }

  function onkeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      add();
    } else if (event.key === 'Backspace' && !draft && value.length) {
      value = value.slice(0, -1);
    }
  }
</script>

<div class="flex flex-col gap-2">
  {#if value.length}
    <ul class="flex flex-wrap gap-1.5">
      {#each value as item (item)}
        <li>
          <span
            class="inline-flex items-center gap-1 rounded-full bg-zinc-900 py-1 pl-2.5 pr-1 text-[0.65rem] font-bold uppercase tracking-wider text-zinc-50"
          >
            {item}
            <button
              type="button"
              class="rounded-full p-0.5 text-zinc-400 transition hover:bg-zinc-700 hover:text-zinc-50"
              onclick={() => remove(item)}
              aria-label="Remove {item}"
            >
              <X class="size-3" aria-hidden="true" />
            </button>
          </span>
        </li>
      {/each}
    </ul>
  {/if}

  <div class="flex gap-1.5">
    <input
      {id}
      class="min-w-0 flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm transition placeholder:text-zinc-300 focus:border-zinc-400 focus:bg-white focus:outline-none"
      type="text"
      bind:value={draft}
      {onkeydown}
      {placeholder}
      autocapitalize="none"
      autocomplete="off"
    />
    <button
      type="button"
      class="shrink-0 rounded-xl border border-zinc-200 bg-white px-3 text-zinc-500 transition hover:border-zinc-900 hover:bg-zinc-900 hover:text-zinc-50 disabled:opacity-40 disabled:hover:border-zinc-200 disabled:hover:bg-white disabled:hover:text-zinc-500"
      onclick={add}
      disabled={!draft.trim()}
      aria-label="Add"
    >
      <Plus class="size-4" aria-hidden="true" />
    </button>
  </div>
</div>
