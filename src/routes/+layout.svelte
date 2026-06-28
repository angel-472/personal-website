<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
    import ImageViewer from '$lib/components/ImageViewer.svelte';
  import "../app.css";

	let { children } = $props();
</script>

<svelte:head>
	<!-- Google Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700" rel="stylesheet">

	<!-- Website Data and SEO -->
	<link rel="icon" href={favicon} />
	<title>Angel Diaz - Full Stack Software Engineer</title>
</svelte:head>

<a
	href="#profile"
	class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-zinc-50"
>
	Skip to content
</a>

<div class="flex min-h-screen flex-col bg-zinc-100 font-[Google_Sans] text-zinc-900">
	<main class="flex-1 px-5 py-12 sm:py-16">
		<div class="rise mx-auto flex w-full max-w-xl flex-col gap-10">
			{@render children()}
		</div>
	</main>

	<footer class="pb-10 text-center">
		<p class="text-xs text-zinc-400">
			Made with <span aria-hidden="true">♥︎</span><span class="sr-only">love</span> by Angel Diaz
		</p>
	</footer>
</div>

<ImageViewer />
