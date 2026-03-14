<script lang="ts">
  import { formatRelativeTime } from '$lib/dateUtils';
  
  export let data;
</script>

<svelte:head>
  <title>Blog - Diaza</title>
  <meta name="description" content="Thoughts, tutorials, and musings on software development, technology, and life." />
</svelte:head>

<main aria-label="Blog page" class="w-full flex flex-col gap-8">
  <section class="flex flex-col" aria-label="Blog Header">
    <h1 class="text-6xl font-bold">Blog</h1>
    <p class="text-lg text-gray-600 mt-4">Thoughts, tutorials, and musings on software development, technology, and life.</p>
  </section>

  <p>Design not final - prototyping blog code</p>

  <!-- Blog Posts List -->
  <section class="flex flex-col gap-6" aria-label="Blog Posts List">
    {#each data.posts as post}
      <article class="border-b pb-4" aria-label={`Blog post: ${post.title}`}>
        <h2 class="text-2xl font-semibold">{post.title}</h2>
        <p class="text-gray-600 text-sm">{post.excerpt ?? "No excerpt available."}</p>
        <p>{formatRelativeTime(post.creationDate)}</p>
        <a href={`/blog/${post.slug}`} class="text-blue-500 hover:underline mt-2 inline-block">Read more</a>
      </article>
    {/each}
  </section>
</main>