<script lang="ts">
  import { formatRelativeTime } from '$lib/dateUtils';
  
  export let data;

  function formatDate(date){
    date = new Date(date + 'T00:00-0800'); // Parse as local time
    const formatted = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    return formatted;
  }
</script>

<svelte:head>
  <title>Blog - Diaza</title>
  <meta name="description" content="Thoughts, tutorials, and musings on software development, technology, and life." />
</svelte:head>

<main aria-label="Blog page" class="w-full flex flex-col gap-8">
  <section class="flex flex-col" aria-label="Blog Header">
    <h1 class="text-5xl sm:text-6xl font-bold">Blog</h1>
    <p class="text-lg text-gray-600 mt-4">Thoughts, tutorials, and musings on software development, technology, and life.</p>
  </section>

  <!-- Blog Posts List -->
  <section class="flex flex-col gap-8 mt-4" aria-label="Blog Posts List">
    {#each data.posts as post}
      <a href={`/blog/${post.slug}`}>
      <article class="w-full sm:h-40 flex flex-col sm:flex-row " aria-label={`Blog post: ${post.title}`}>
        <img src={post.coverImageUrl ?? 'https://placehold.co/600x400'} alt={`Cover image for ${post.title}`} class="object-cover max-h-full aspect-video" />
        <div class="flex flex-col mt-6 sm:mt-0 sm:ml-4 flex-1 overflow-hidden min-w-0">
          <h2 class="text-2xl font-semibold">{post.title}</h2>
          <p class="text-gray-500 text-sm">{formatDate(post.creationDate)}</p>
          <p class="text-gray-600 mt-2 line-clamp-2 sm:line-clamp-3">{post.excerpt ?? "No excerpt available."}</p>
        </div>
      </article>
      </a>
    {/each}
  </section>
</main>