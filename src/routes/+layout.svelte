<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
  import "../app.css";
	import { Menu } from 'lucide-svelte';
	import { page } from '$app/state';
	import { fly } from 'svelte/transition'
	import { backOut } from 'svelte/easing';

	let { children } = $props();
</script>

<svelte:head>
	<!-- Google Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">

	<!-- Website Data and SEO -->
	<link rel="icon" href={favicon} />
	<title>Diaza - Personal Website</title>
</svelte:head>

<div id="layout-wrapper" class="w-full min-h-screen flex flex-col items-center bg-gray-50 px-6 sm:px-12 font-['Google_Sans']">
	<header class="w-full flex mt-4 mb-8">
		<nav class="flex border-b w-full py-4 justify-between items-center">
			<a href="/" class="text-2xl font-bold">Diaza.</a>
			<div aria-label="Main Navigation" class="hidden md:flex gap-6">
				<a href="/about" class="text-gray-900 {page.url.pathname.toString().split('/')[1] === 'about' ? 'font-bold' : ''}">About</a>
				<a href="/projects" class="text-gray-900 {page.url.pathname.toString().split('/')[1] === 'projects' ? 'font-bold' : ''}">Projects</a>
				<a href="/blog" class="text-gray-900 {page.url.pathname.toString().split('/')[1] === 'blog' ? 'font-bold' : ''}">Blog</a>
				<a href="/photos" class="text-gray-900 {page.url.pathname.toString().split('/')[1] === 'photos' ? 'font-bold' : ''}">Photos</a>
				<a href="/now" class="text-gray-900 {page.url.pathname.toString().split('/')[1] === 'now' ? 'font-bold' : ''}">Now</a>
				<div aria-label="Social Media Links" class="flex space-x-4">

				</div>
			</div>
			<button aria-label="Toggle Navigation" class="md:hidden text-gray-700 hover:text-gray-900">
				<Menu size={24} />
			</button>
		</nav>
	</header>

	{#key page.url}
		<div
			class="flex flex-col w-full mb-32"
			in:fly={{ y: 120, duration: 200, delay: 50, easing: backOut }}
		>
			{@render children()}
		</div>
	{/key}
</div>
