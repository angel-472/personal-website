<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
  import "../app.css";
	import { Menu, X } from 'lucide-svelte';
	import { page } from '$app/state';
	import { fly } from 'svelte/transition'
	import { backOut } from 'svelte/easing';
	import { getWeatherString } from '$lib/weatherString';

	let { children } = $props();


	let showMobileMenu = $state(false);
	function toggleMobileMenu() {
		showMobileMenu = !showMobileMenu;
	}

	let weatherString = $state("");
	getWeatherString().then(str => weatherString = str);


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

<div id="layout-wrapper" class="w-full min-h-screen pb-48 flex flex-col items-center bg-zinc-900 px-6 sm:px-12 font-['Rubik'] text-zinc-100">
	<header class="sticky top-0 w-full flex pt-4 mb-12 bg-zinc-900/98 z-20">
		<nav class="flex border-b border-zinc-800 w-full py-4 justify-between items-center">
			<a href="/" class="text-2xl font-bold">Diaza.</a>
			<div aria-label="Main Navigation" class="hidden md:flex gap-6">
				<a href="/about" class="text-zinc-100 hover:text-zinc-300 transition-colors {page.url.pathname.toString().split('/')[1] === 'about' ? 'font-bold' : ''}">About</a>
				<a href="/projects" class="text-zinc-100 hover:text-zinc-300 transition-colors {page.url.pathname.toString().split('/')[1] === 'projects' ? 'font-bold' : ''}">Projects</a>
				<a href="/blog" class="text-zinc-100 hover:text-zinc-300 transition-colors {page.url.pathname.toString().split('/')[1] === 'blog' ? 'font-bold' : ''}">Blog</a>
				<a href="/photos" class="text-zinc-100 hover:text-zinc-300 transition-colors {page.url.pathname.toString().split('/')[1] === 'photos' ? 'font-bold' : ''}">Photos</a>
				<a href="/now" class="text-zinc-100 hover:text-zinc-300 transition-colors {page.url.pathname.toString().split('/')[1] === 'now' ? 'font-bold' : ''}">Now</a>
				<div aria-label="Social Media Links" class="flex space-x-4">

				</div>
			</div>
			<button aria-label="Toggle Navigation" class="md:hidden text-zinc-300 hover:text-zinc-100" onclick={toggleMobileMenu}>
				{#if showMobileMenu}
					<!-- Close Icon -->
					<X size={24} />
				{:else}
					<!-- Menu Icon -->	
					<Menu size={24} />
				{/if}
			</button>
		</nav>
	</header>
	<!-- TODO: Improve / animate mobile menu -->
	{#if showMobileMenu}
		<div class="md:hidden w-full bg-zinc-800 shadow-md rounded-lg p-4 mb-4 absolute top-20 left-0 z-10 border border-zinc-700">
			<a href="/about" class="block py-2 text-zinc-100 {page.url.pathname.toString().split('/')[1] === 'about' ? 'font-bold' : ''}" onclick={toggleMobileMenu}>About</a>
			<a href="/projects" class="block py-2 text-zinc-100 {page.url.pathname.toString().split('/')[1] === 'projects' ? 'font-bold' : ''}" onclick={toggleMobileMenu}>Projects</a>
			<a href="/blog" class="block py-2 text-zinc-100 {page.url.pathname.toString().split('/')[1] === 'blog' ? 'font-bold' : ''}" onclick={toggleMobileMenu}>Blog</a>
			<a href="/photos" class="block py-2 text-zinc-100 {page.url.pathname.toString().split('/')[1] === 'photos' ? 'font-bold' : ''}" onclick={toggleMobileMenu}>Photos</a>
			<a href="/now" class="block py-2 text-zinc-100 {page.url.pathname.toString().split('/')[1] === 'now' ? 'font-bold' : ''}" onclick={toggleMobileMenu}>Now</a>
		</div>
	{/if}

	{#key page.url}
		<div
			class="flex flex-col w-full min-h-screen"
			in:fly={{ y: 120, duration: 200, delay: 50, easing: backOut }}
		>
			{@render children()}
		</div>
	{/key}
</div>
<!-- SITE FOOTER -->
<footer class="w-full py-8 text-center text-zinc-300 bg-zinc-950 font-['Rubik'] flex flex-col items-center border-t border-zinc-900">
	<p class="text-sm">&copy; {new Date().getFullYear()} Angel Diaz. All rights reserved.</p>
	
	<div class="text-xs text-zinc-400 p-4 w-2xs sm:w-lg">{weatherString}</div>
	<p class="mt-16 mb-4 text-xs text-zinc-400 italic">Somewhere between thought<br>and the thing thought brings to life — <br>that's where I live now</p>
</footer>