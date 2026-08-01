export function load() {
  const files = import.meta.glob('/src/projects/*.md', { eager: true });
  const projects = Object.entries(files)
    .map(([path, mod]) => ({
      ...(mod as any).metadata,
      slug: path.split('/').at(-1)?.replace('.md', '')
    }))
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

  return { projects };
}
