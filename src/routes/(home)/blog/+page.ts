const WORDS_PER_MINUTE = 200;

/** Rough read time from the raw markdown, frontmatter and syntax stripped out. */
function readTime(source: string): number {
  const body = source
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#>*_`~\[\]()]/g, ' ');
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

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
      readTime: readTime(sources[path] ?? '')
    }))
    .filter((post) => post.published !== false)
    .sort((a, b) => (a.creationDate < b.creationDate ? 1 : -1));

  return {
    posts,
    title: 'Blog - Angel Diaz',
    description: 'Posts by Angel Diaz on software engineering, side projects and things worth writing down.'
  };
}
