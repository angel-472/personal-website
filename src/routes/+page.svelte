<script>
  import ProjectsPreview from "$lib/components/ProjectsPreview.svelte";
  import { Github, Youtube, Linkedin, Mail, ArrowUpRight } from "lucide-svelte";

  const today = new Date();
  const age = today.getFullYear() - 2004 - (today.getMonth() < 9 ? 1 : 0);

  const socials = [
    { label: "GitHub", handle: "@angel-472", href: "https://github.com/angel-472", icon: Github },
    { label: "YouTube", handle: "@diazadev", href: "https://www.youtube.com/@diazadev", icon: Youtube },
    { label: "LinkedIn", handle: "in/angel-diaza", href: "https://www.linkedin.com/in/angel-diaza/", icon: Linkedin },
  ];
</script>

<!-- Profile -->
<section id="profile" aria-labelledby="profile-name" class="flex flex-col items-center text-center">
  <img
    class="size-28 rounded-full object-cover shadow-sm ring-4 ring-white"
    src="/img/profile.jpeg"
    alt="Portrait of Angel Diaz"
    width="112"
    height="112"
  />
  <h1 id="profile-name" class="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
    Angel Diaz
  </h1>
  <p class="mt-1.5 text-sm font-bold text-zinc-700">
    {age} y/o Full Stack Software Engineer - Puerto Rico <span aria-hidden="true">🇵🇷</span>
  </p>
  <p class="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
    Focused on backend systems and game development, with a background in computer systems and networking.
  </p>
</section>

<!-- Social links -->
<nav aria-label="Social profiles" class="flex flex-col gap-3">
  {#each socials as social (social.label)}
    {@const Icon = social.icon}
    <a
      class="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-zinc-900 hover:bg-zinc-900 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100"
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="{social.label} (opens in a new tab)"
    >
      <Icon class="size-5 shrink-0 text-zinc-900 transition-colors duration-200 group-hover:text-zinc-50" aria-hidden="true" />
      <span class="flex-1 text-left text-sm font-bold text-zinc-900 transition-colors duration-200 group-hover:text-zinc-50">
        {social.label}
      </span>
      <span class="hidden text-xs text-zinc-400 transition-colors duration-200 group-hover:text-zinc-500 sm:inline">
        {social.handle}
      </span>
      <ArrowUpRight class="size-4 shrink-0 text-zinc-300 transition-colors duration-200 group-hover:text-zinc-50" aria-hidden="true" />
    </a>
  {/each}
</nav>

<!-- Projects -->
<section id="projects" aria-labelledby="projects-heading" class="flex flex-col gap-4">
  <h2 id="projects-heading" class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
    Featured Projects
  </h2>
  <ProjectsPreview />
</section>

<!-- Contact -->
<section id="contact" aria-labelledby="contact-heading" class="flex flex-col gap-4">
  <h2 id="contact-heading" class="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
    Get in touch
  </h2>
  <a
    class="group flex items-center gap-4 rounded-2xl bg-zinc-900 px-5 py-4 text-zinc-50 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100"
    href="mailto:hello@diaza.dev"
  >
    <Mail class="size-5 shrink-0" aria-hidden="true" />
    <span class="flex-1 text-left text-sm font-bold">hello@diaza.dev</span>
    <ArrowUpRight class="size-4 shrink-0 text-zinc-400 transition-colors duration-200 group-hover:text-zinc-50" aria-hidden="true" />
  </a>
</section>
