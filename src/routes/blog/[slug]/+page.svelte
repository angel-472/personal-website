<script lang="ts">
  import { page } from '$app/state';
  import { fly } from 'svelte/transition'
  import { backOut } from 'svelte/easing';
  import { formatDateWords } from '$lib/dateUtils';
  import { onMount } from 'svelte';

  let { data } = $props();

  let readingTime = $state(0);

  onMount(() => {
    const postElement = document.getElementById('post-content');
    if (postElement) {
      const text = postElement.innerText || '';
      const words = text.trim().split(/\s+/).length;
      console.log(words + " words")
      readingTime = Math.ceil(words / 200); // Assuming 200 WPM reading speed
      console.log("Estimated reading time: " + readingTime + " minutes")
    }
  });
</script>

<svelte:head>
  <title>{data.post.metadata.title} - Diaza</title>
  <meta name="description" content={data.post.metadata.excerpt ?? "A blog post on Diaza's personal website."} />
</svelte:head>

<!-- Todo: Add heading that will render the post title, date, cover image, etc -->
<section class="sm:px-12 lg:px-64 text-zinc-100">
  {#if data.post.metadata.coverImageUrl}
    <img src={data.post.metadata.coverImageUrl} alt={`Cover image for ${data.post.metadata.title}`} class="w-full mb-8 object-cover object-center h-40 sm:h-80 aspect-video rounded-lg" />
  {/if}
  <h1 class="text-4xl font-bold mb-2">{data.post.metadata.title}</h1>
  <!-- Post details -->
  <div class="flex items-center gap-2 mb-6 text-zinc-400">
    <p>{formatDateWords(data.post.metadata.creationDate)}</p>
    <span>•</span>
    <p>{readingTime} min read</p>
  </div>
  <div id="post-content" class="blog-post w-full prose-invert" aria-label={`Blog post content for ${data.post.metadata.title}`}>
    {@render data.post.default()}
  </div>
</section>


<!-- Styles for blog post rendered markdown -->
<style>
  .blog-post {
    color: #e4e4e7; /* zinc-200 */
    font-family: 'Google Sans', sans-serif;
  }

  /* Typography */
  .blog-post :global(h1), 
  .blog-post :global(h2), 
  .blog-post :global(h3), 
  .blog-post :global(h4) {
    font-family: 'Rubik', sans-serif;
    color: #f4f4f5; /* zinc-100 */
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    line-height: 1.2;
    font-weight: 600;
  }

  .blog-post :global(h1) {
    font-size: 2.75rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
    letter-spacing: -0.02em;
  }

  .blog-post :global(h2) {
    font-size: 1.75rem;
  }

  .blog-post :global(h3) {
    font-size: 1.4rem;
  }

  .blog-post :global(p) {
    font-size: 1.125rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    color: #d4d4d8; /* zinc-300 */
  }

  /* Links */
  .blog-post :global(a) {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: #71717a; /* zinc-500 */
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
    transition: all 0.2s ease;
  }

  .blog-post :global(a:hover) {
    color: #f4f4f5; /* zinc-100 */
    text-decoration-color: #f4f4f5; /* zinc-100 */
  }

  /* Lists */
  .blog-post :global(ul), 
  .blog-post :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    font-size: 1.125rem;
    line-height: 1.8;
    color: #d4d4d8; /* zinc-300 */
  }

  .blog-post :global(ul) {
    list-style-type: disc;
  }

  .blog-post :global(ol) {
    list-style-type: decimal;
  }

  .blog-post :global(li) {
    margin-bottom: 0.5rem;
  }

  /* Quotes */
  .blog-post :global(blockquote) {
    border-left: 2px solid #52525b; /* zinc-600 */
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    font-size: 1.25rem;
    color: #a1a1aa; /* zinc-400 */
  }

  /* Media */
  .blog-post :global(img),
  .blog-post :global(video) {
    max-width: 100%;
    height: auto;
    margin: 2.5rem 0;
    border-radius: 6px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5); 
  }

  /* Code */
  .blog-post :global(pre) {
    background-color: #27272a; /* zinc-800 */
    border: 1px solid #3f3f46; /* zinc-700 */
    padding: 1.25rem;
    border-radius: 6px;
    overflow-x: auto;
    margin: 2rem 0;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .blog-post :global(code) {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    background-color: #27272a; /* zinc-800 */
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.85em;
    color: #e4e4e7; /* zinc-200 */
  }

  .blog-post :global(pre code) {
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    font-size: 1em;
    color: inherit;
  }

  /* Dividers */
  .blog-post :global(hr) {
    border: 0;
    border-top: 1px solid #3f3f46; /* zinc-700 */
    margin: 3rem auto;
    width: 60%; 
  }
</style>