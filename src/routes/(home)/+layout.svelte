<script lang="ts">
  import { page } from "$app/state";
  import { fade } from "svelte/transition";
  import ProjectSheet from "$lib/components/ProjectSheet.svelte";
  import { Github, Youtube, Linkedin, Mail } from "lucide-svelte";

  let { children } = $props();

  const socials = [
    { label: "GitHub", handle: "@angel-472", href: "https://github.com/angel-472", icon: Github },
    { label: "YouTube", handle: "@diazadev", href: "https://www.youtube.com/@diazadev", icon: Youtube },
    { label: "LinkedIn", handle: "in/angel-diaza", href: "https://www.linkedin.com/in/angel-diaza/", icon: Linkedin },
  ];

  const tabs = [
    { label: "Projects", href: "/" },
    { label: "Posts", href: "/blog" },
  ];

  const currentTab = $derived(page.url.pathname.startsWith("/blog") ? "/blog" : "/");
</script>

<!-- Profile -->
<section id="profile" aria-labelledby="profile-name" class="flex flex-col items-center text-center">
  <img
    class="size-28 rounded-full object-cover shadow-sm ring-4 ring-white"
    src="/img/profile.jpeg"
    alt="Portrait of Angel Diaz"
    width="112"
    height="112"
    allow_enlarge=true
  />
  <h1 id="profile-name" class="mt-5 text-2xl font-bold sm:text-3xl">
    Angel Diaz
  </h1>
  <p class="mt-1.5 text-sm font-bold text-zinc-700">
    Full Stack Software Engineer<br>From Puerto Rico <span aria-hidden="true">🇵🇷</span>
  </p>
  <p class="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
    I build web apps end to end, from the UI down to the servers they run on.
  </p>
</section>

<!-- Availability + socials. These sit in one container so they read as a single
     block under the profile, rather than picking up the page's wider gap. -->
<div class="flex flex-col gap-2">
  <!-- Availability. The status is plain text so the only emphasis on the page
       lands on the one thing worth clicking. -->
  <p class="pb-1 text-center text-sm text-zinc-500">Currently open to work.</p>
  <a
    class="flex items-center justify-center gap-3 rounded-2xl bg-zinc-900 px-5 py-4 text-zinc-50 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100"
    href="mailto:hello@diaza.dev"
  >
    <Mail class="size-5 shrink-0" aria-hidden="true" />
    <span class="text-sm font-bold">hello@diaza.dev</span>
  </a>

  <!-- Social links -->
  <nav aria-label="Social profiles" class="grid grid-cols-3 gap-2">
    {#each socials as social (social.label)}
      {@const Icon = social.icon}
      <a
        class="group flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-3.5 transition duration-200 hover:border-zinc-900 hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100"
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="{social.label} — {social.handle} (opens in a new tab)"
      >
        <Icon class="size-4 shrink-0 text-zinc-900 transition-colors duration-200 group-hover:text-zinc-50" aria-hidden="true" />
        <span class="text-xs font-bold text-zinc-500 transition-colors duration-200 group-hover:text-zinc-50">
          {social.label}
        </span>
      </a>
    {/each}
  </nav>
</div>

<!-- Projects / Posts -->
<div class="flex flex-col gap-6">
  <!-- Switcher -->
  <nav aria-label="Featured work" class="grid grid-cols-2 gap-1 rounded-2xl bg-zinc-200/70 p-1">
    {#each tabs as tab (tab.href)}
      {@const isActive = currentTab === tab.href}
      <a
        class="rounded-xl border px-4 py-2.5 text-center text-sm font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100 {isActive
          ? 'border-zinc-200 bg-white text-zinc-900 shadow-sm'
          : 'border-transparent text-zinc-400 hover:text-zinc-600'}"
        href={tab.href}
        aria-current={isActive ? "page" : undefined}
        data-sveltekit-noscroll
      >
        {tab.label}
      </a>
    {/each}
  </nav>

  <!-- Only this part swaps between the two tabs; both share the same grid cell
       so the crossfade doesn't push the page around. -->
  <div class="grid">
    {#key currentTab}
      <div
        class="col-start-1 row-start-1"
        in:fade={{ duration: 200, delay: 130 }}
        out:fade={{ duration: 130 }}
      >
        {@render children()}
      </div>
    {/key}
  </div>
</div>

<ProjectSheet />
