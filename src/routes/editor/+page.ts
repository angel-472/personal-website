import { parseDocument } from '$lib/editor/frontmatter';
import { withDefaults, type DocKindId, type EditorDoc } from '$lib/editor/schema';

type RawFiles = Record<string, unknown>;

function collect(files: RawFiles, kind: DocKindId): EditorDoc[] {
  return Object.entries(files).map(([path, raw]) => {
    const { meta, body } = parseDocument(String(raw));
    const slug = path.split('/').at(-1)?.replace('.md', '') ?? '';
    return { kind, slug, sourceSlug: slug, meta: withDefaults(kind, meta), body };
  });
}

export function load() {
  // `?raw` hands back the file exactly as it is on disk, frontmatter included,
  // instead of the component mdsvex compiles it into.
  const projects = import.meta.glob('/src/projects/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
  });
  const posts = import.meta.glob('/src/posts/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
  });

  return {
    docs: [...collect(projects, 'project'), ...collect(posts, 'post')],
    title: 'Content editor - Angel Diaz',
    description: 'Write and export project and post markdown files.',
    layout: 'wide'
  };
}
