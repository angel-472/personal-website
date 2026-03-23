<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
  import "../app.css";
	import { Menu, X } from 'lucide-svelte';
	import { page } from '$app/state';
	import { fly } from 'svelte/transition'
	import { backOut } from 'svelte/easing';

	let { children } = $props();


	let showMobileMenu = $state(false);
	function toggleMobileMenu() {
		showMobileMenu = !showMobileMenu;
	}

	async function getWeatherString() {
		const lat = 18.4655;
		const lon = -66.1057;

		const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&temperature_unit=fahrenheit&timezone=America%2FPuerto_Rico`;

		const res = await fetch(url);
		const data = await res.json();

		const temp = Math.round(data.current.temperature_2m);
		const code = data.current.weathercode;
		const hour = new Date().toLocaleString("en-US", {
			timeZone: "America/Puerto_Rico",
			hour: "numeric",
			hour12: false,
		});
		const h = parseInt(hour);

		const isNight = h < 6 || h >= 20;
		const isEvening = h >= 17 && h < 20;
		const isMorning = h >= 6 && h < 11;

		const timeLabel = isNight ? "night" : isEvening ? "evening" : isMorning ? "morning" : "afternoon";

		// WMO weather codes → description + emoji
		const getCondition = (code, night) => {
			if (code === 0)  return night ? ["The sky is clear", "🌙"] : ["Clear skies, the sun is shining bright", "☀️"];
			if (code === 1)  return ["Mostly clear skies", night ? "🌙" : "🌤️"];
			if (code === 2)  return ["Partly cloudy", "⛅"];
			if (code === 3)  return ["Overcast and cloudy", "☁️"];
			if ([45, 48].includes(code)) return ["Foggy out there", "🌫️"];
			if ([51, 53, 55].includes(code)) return ["A light drizzle is falling", "🌦️"];
			if ([61, 63, 65].includes(code)) return ["It's raining", "🌧️"];
			if ([71, 73, 75, 77].includes(code)) return ["Snow is falling", "❄️"]; // unlikely but complete
			if ([80, 81, 82].includes(code)) return ["Rain showers passing through", "🌦️"];
			if ([95, 96, 99].includes(code)) return ["There's a thunderstorm rolling in", "⛈️"];
			return ["Interesting skies", "🌡️"];
		};

		const [description, emoji] = getCondition(code, isNight);

		return `${description} this beautiful ${timeLabel}. San Juan, Puerto Rico. ${temp}°F. ${emoji}`;
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

<div id="layout-wrapper" class="w-full min-h-screen pb-48 flex flex-col items-center bg-gray-50 px-6 sm:px-12 font-['Rubik'] text-gray-900">
	<header class="w-full flex mt-4 mb-12">
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
			<button aria-label="Toggle Navigation" class="md:hidden text-gray-700 hover:text-gray-900" onclick={toggleMobileMenu}>
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
		<div class="md:hidden w-full bg-white shadow-md rounded-lg p-4 mb-4 absolute top-20 left-0 z-10">
			<a href="/about" class="block py-2 text-gray-900 {page.url.pathname.toString().split('/')[1] === 'about' ? 'font-bold' : ''}" onclick={toggleMobileMenu}>About</a>
			<a href="/projects" class="block py-2 text-gray-900 {page.url.pathname.toString().split('/')[1] === 'projects' ? 'font-bold' : ''}" onclick={toggleMobileMenu}>Projects</a>
			<a href="/blog" class="block py-2 text-gray-900 {page.url.pathname.toString().split('/')[1] === 'blog' ? 'font-bold' : ''}" onclick={toggleMobileMenu}>Blog</a>
			<a href="/photos" class="block py-2 text-gray-900 {page.url.pathname.toString().split('/')[1] === 'photos' ? 'font-bold' : ''}" onclick={toggleMobileMenu}>Photos</a>
			<a href="/now" class="block py-2 text-gray-900 {page.url.pathname.toString().split('/')[1] === 'now' ? 'font-bold' : ''}" onclick={toggleMobileMenu}>Now</a>
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
<footer class="w-full py-8 text-center text-gray-100 bg-gray-900 font-['Google_Sans'] flex flex-col items-center">
	<p class="text-sm">&copy; {new Date().getFullYear()} Angel Diaz. All rights reserved.</p>
	
	<div class="mt-4 text-xs text-gray-200 px-4 py-2 border border-gray-200 w-2xs sm:w-lg rounded-2xl">{weatherString}</div>
	<p class="mt-16 mb-4 text-xs text-gray-200 italic">Somewhere between thought<br>and the thing thought brings to life — <br>that's where I live now</p>
</footer>