<script lang="ts">
  import { page } from '$app/state';
  import { fly } from 'svelte/transition'
  import { backOut } from 'svelte/easing';

  let { data } = $props();
</script>

<div class="blog-post w-full p-6 sm:px-12 lg:px-64">
  {@render data.post.default()}
</div>


<style>
  .blog-post {
    color: #1a1a1a;
    font-family: 'Google Sans', sans-serif;
  }

  /* Typography */
  .blog-post :global(h1), 
  .blog-post :global(h2), 
  .blog-post :global(h3), 
  .blog-post :global(h4) {
    font-family: 'Rubik', sans-serif;
    color: #111;
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
    color: #374151; /* gray-700 */
  }

  /* Links */
  .blog-post :global(a) {
    color: inherit;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
    transition: opacity 0.2s ease;
  }

  .blog-post :global(a:hover) {
    opacity: 0.6;
  }

  /* Lists */
  .blog-post :global(ul), 
  .blog-post :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    font-size: 1.125rem;
    line-height: 1.8;
    color: #374151;
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
    border-left: 2px solid #111;
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    font-size: 1.25rem;
    color: #4b5563; /* gray-600 */
  }

  /* Media */
  .blog-post :global(img),
  .blog-post :global(video) {
    max-width: 100%;
    height: auto;
    margin: 2.5rem 0;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05); /* subtle magazine pop */
  }

  /* Code */
  .blog-post :global(pre) {
    background-color: #f3f4f6; /* gray-100 */
    padding: 1.25rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 2rem 0;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .blog-post :global(code) {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    background-color: #f3f4f6;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.85em;
    color: #1f2937;
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
    border-top: 1px solid #e5e7eb; /* gray-200 */
    margin: 3rem auto;
    width: 60%; /* Magazine style short divider */
  }
</style>