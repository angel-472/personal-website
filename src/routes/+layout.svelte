<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
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



<main id="wrapper" class="font-[Google_Sans] px-4 sm:px-16 py-8 pb-32 bg-zinc-50 text-zinc-900 w-full h-full">

	<header class="flex w-full gap-8 justify-center sm:justify-start">
		<a href="#home">Home</a>
		<a href="#projects">Projects</a>
		<!-- <a href="#posts">Posts</a> -->
		<a href="#contact">Contact</a>
	</header>

	{@render children()}
</main>

	<footer class="text-center bg-zinc-900 text-zinc-50 py-8">
		<p>Made with ♥︎ by Angel Diaz</p>
	</footer>