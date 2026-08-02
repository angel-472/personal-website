import { readTimeFromFile } from '$lib/readTime';

export function load() {
  const files = import.meta.glob('/src/posts/*.md', { eager: true });
  const sources = import.meta.glob('/src/posts/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
  }) as Record<string, string>;

  const posts = Object.entries(files)
    .map(([path, mod]) => ({
      ...(mod as any).metadata,
      slug: path.split('/').at(-1)?.replace('.md', ''),
      readTime: readTimeFromFile(sources[path] ?? '')
    }))
    .filter((post) => post.published !== false)
    .sort((a, b) => (a.creationDate < b.creationDate ? 1 : -1));

  return {
    posts,
    title: 'Blog - Angel Diaz',
    description: 'Posts by Angel Diaz on software engineering, side projects and things worth writing down.'
  };
}
