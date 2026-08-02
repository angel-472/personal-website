import { error } from '@sveltejs/kit';
import { readTimeFromFile } from '$lib/readTime';

export function load({ params }) {
  const files = import.meta.glob('/src/posts/*.md', { eager: true });
  const sources = import.meta.glob('/src/posts/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
  }) as Record<string, string>;

  const path = `/src/posts/${params.slug}.md`;
  const file = files[path] as any;

  if (!file || file.metadata?.published === false) {
    error(404, 'Post not found');
  }

  return {
    content: file.default,
    meta: { ...file.metadata, slug: params.slug, readTime: readTimeFromFile(sources[path] ?? '') },
    title: `${file.metadata.title} - Angel Diaz`,
    description: file.metadata.excerpt,
    // Feeds the link preview in +layout.svelte. Posts without a cover image fall
    // back to the site card there, so leaving `image` undefined is fine.
    ogType: 'article',
    image: file.metadata.coverImageUrl,
    imageAlt: file.metadata.coverImageUrl ? `Cover image for ${file.metadata.title}` : undefined,
    publishedTime: file.metadata.creationDate
  };
}
