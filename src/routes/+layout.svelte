<script lang="ts">
	import ImageViewer from '$lib/components/ImageViewer.svelte';
  import { page } from '$app/state';
  import { getWeatherString } from '$lib/weatherString';
  import {
    absoluteUrl,
    AUTHOR,
    DEFAULT_DESCRIPTION,
    DEFAULT_OG_IMAGE,
    DEFAULT_OG_IMAGE_ALT,
    DEFAULT_TITLE,
    SITE_NAME
  } from '$lib/site';
  import "../app.css";

	let weatherString = $state("");
	getWeatherString().then((value) => {
		weatherString = value;
	})

	let { children } = $props();

	// Pages override any of these by returning them from their load function.
	const title = $derived(page.data.title ?? DEFAULT_TITLE);
	const description = $derived(page.data.description ?? DEFAULT_DESCRIPTION);

	// Link previews need absolute URLs, and they need them in the server-rendered
	// HTML -- scrapers don't run our JS, so anything set after hydration is invisible.
	const canonical = $derived(absoluteUrl(page.url.pathname));
	const ogType = $derived(page.data.ogType ?? 'website');

	// Tool pages (the content editor) ask for a wider column than the site's reading width.
	const isWide = $derived(page.data.layout === 'wide');

	// Posts fall back to the site card when they have no cover image of their own.
	const hasCustomImage = $derived(Boolean(page.data.image));
	const ogImage = $derived(absoluteUrl(page.data.image ?? DEFAULT_OG_IMAGE));
	const ogImageAlt = $derived(page.data.imageAlt ?? (hasCustomImage ? title : DEFAULT_OG_IMAGE_ALT));
</script>

<svelte:head>
	<!-- Google Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

	<!-- Website Data and SEO. Icons and the PWA manifest live in src/app.html;
	     everything here varies per page. -->
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content={AUTHOR} />
	<link rel="canonical" href={canonical} />

	<!-- Open Graph: Facebook, LinkedIn, Slack, Discord, iMessage, WhatsApp -->
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:type" content={ogType} />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:alt" content={ogImageAlt} />
	{#if !hasCustomImage}
		<!-- Dimensions are only declared for the card we generate, since post cover
		     images vary. Without them some scrapers render a blank box on first fetch. -->
		<meta property="og:image:type" content="image/png" />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
	{/if}
	{#if page.data.publishedTime}
		<meta property="article:published_time" content={page.data.publishedTime} />
		<meta property="article:author" content={AUTHOR} />
	{/if}

	<!-- Twitter/X reads og:* for the rest, but still needs its own card type -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:image:alt" content={ogImageAlt} />
</svelte:head>

<a
	href="#profile"
	class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-zinc-50"
>
	Skip to content
</a>

<div class="flex min-h-screen flex-col bg-zinc-100 font-[Google_Sans] text-zinc-900">
	<main class="flex-1 px-5 py-12 sm:py-16">
		<div class="rise mx-auto flex w-full flex-col gap-10 {isWide ? 'max-w-5xl' : 'max-w-xl'}">
			{@render children()}
		</div>
	</main>

	<footer class="pb-10 text-center w-full flex flex-col justify-center items-center align-middle">
		<p class="text-xs text-zinc-400 max-w-xs sm:max-w-none mb-4">
			{weatherString}
		</p>
		<p class="text-xs text-zinc-400">
			Made with <span aria-hidden="true">♥︎</span><span class="sr-only">love</span> by Angel Diaz
		</p>
	</footer>
</div>

<ImageViewer />
