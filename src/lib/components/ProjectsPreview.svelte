<script lang="ts">
  import { ArrowUpRight } from "lucide-svelte";

  let { projects: PROJECTS = [] } = $props();

  function selectProject(project: { slug: string }){
    // Write the slug to the URL; the navigate listener in ProjectSheet
    // picks up the change and opens the sheet.
    const url = new URL(window.location.href);
    url.searchParams.set('project', project.slug);
    window.history.pushState(null, '', url);
  }
</script>

<div class="grid grid-cols-1 gap-4 {PROJECTS.length > 1 ? 'sm:grid-cols-2' : ''}">
  {#each PROJECTS as project (project.name ?? "")}
    {@const lang = project.lang ?? ""}
    {@const tagline = project.description ?? ""}
    <button class="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:cursor-pointer text-left" onclick={() => selectProject(project)}>
      <div class="relative aspect-video w-full overflow-hidden bg-zinc-100">
        <img
          class="size-full object-cover transition duration-300"
          src={project.images[0]}
          alt="Screenshot of {project.name}"
          loading="lazy"
        />
        {#if lang}
          <span class="absolute left-3 top-3 rounded-full bg-zinc-900/90 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-zinc-50 backdrop-blur">
            {lang}
          </span>
        {/if}
      </div>
      <div class="flex items-start gap-3 p-5">
        <div class="flex-1">
          <h3 class="font-bold text-zinc-900">{project.name}</h3>
          {#if tagline}
            <p class="mt-1 text-sm leading-relaxed text-zinc-500">{tagline}</p>
          {/if}
        </div>
        <ArrowUpRight class="mt-0.5 size-4 shrink-0 text-zinc-300 transition-colors duration-200 group-hover:text-zinc-900" aria-hidden="true" />
      </div>
    </button>
  {/each}
</div>