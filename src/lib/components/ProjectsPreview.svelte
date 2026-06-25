<script>
  import { ArrowUpRight } from "lucide-svelte";
  import { PROJECTS } from "$lib/projects";
</script>

<div class="grid grid-cols-1 gap-4" class:sm:grid-cols-2={PROJECTS.length > 1}>
  {#each PROJECTS as project (project.name)}
    {@const lines = project.description.split("\n").map((l) => l.trim()).filter(Boolean)}
    {@const lang = lines[0]}
    {@const tagline = lines[1] ?? ""}
    <article class="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div class="relative aspect-video w-full overflow-hidden bg-zinc-100">
        <img
          class="size-full object-cover transition duration-300 group-hover:scale-[1.03]"
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
    </article>
  {/each}
</div>
