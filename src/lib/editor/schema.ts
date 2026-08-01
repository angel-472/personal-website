import type { Meta } from './frontmatter';

export type FieldType = 'text' | 'textarea' | 'url' | 'date' | 'number' | 'boolean' | 'chips' | 'images';

export interface Field {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  help?: string;
  required?: boolean;
}

export type DocKindId = 'project' | 'post';

export interface DocKind {
  id: DocKindId;
  label: string;
  plural: string;
  /** Where the exported file belongs in the repo */
  dir: string;
  /** Frontmatter key holding the display title */
  titleKey: string;
  fields: Field[];
  defaults: Meta;
}

export const KINDS: Record<DocKindId, DocKind> = {
  project: {
    id: 'project',
    label: 'Project',
    plural: 'Projects',
    dir: 'src/projects',
    titleKey: 'name',
    fields: [
      { key: 'name', label: 'Name', type: 'text', placeholder: 'FlowBudget', required: true },
      {
        key: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'One line about what it does.',
        help: 'Shown under the title on the project card.'
      },
      { key: 'lang', label: 'Primary language', type: 'text', placeholder: 'Svelte', help: 'Badge on the card image.' },
      { key: 'startDate', label: 'Start date', type: 'date' },
      { key: 'images', label: 'Images', type: 'images', help: 'The first image is used as the card thumbnail.' },
      { key: 'tags', label: 'Tags', type: 'chips', placeholder: 'TailwindCSS' },
      { key: 'github', label: 'GitHub URL', type: 'url', placeholder: 'https://github.com/angel-472/…' },
      { key: 'demo', label: 'Demo URL', type: 'url', placeholder: 'https://…' },
      { key: 'priority', label: 'Priority', type: 'number', help: 'Higher numbers sort first on the homepage.' }
    ],
    defaults: {
      name: '',
      description: '',
      lang: '',
      startDate: '',
      images: [],
      tags: [],
      github: '',
      demo: '',
      priority: 0
    }
  },
  post: {
    id: 'post',
    label: 'Post',
    plural: 'Posts',
    dir: 'src/posts',
    titleKey: 'title',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Why I rewrote…', required: true },
      { key: 'creationDate', label: 'Date', type: 'date', required: true },
      {
        key: 'excerpt',
        label: 'Excerpt',
        type: 'textarea',
        placeholder: 'A sentence or two summarising the post.',
        help: 'Used as the page description and shown under the title.'
      },
      { key: 'coverImageUrl', label: 'Cover image', type: 'images', help: 'Optional image shown above the post.' },
      { key: 'categories', label: 'Categories', type: 'chips', placeholder: 'gamedev' },
      { key: 'published', label: 'Published', type: 'boolean', help: 'Unpublished posts are hidden from the blog.' }
    ],
    defaults: {
      title: '',
      creationDate: '',
      excerpt: '',
      coverImageUrl: '',
      categories: [],
      published: true
    }
  }
};

export const KIND_LIST: DocKind[] = [KINDS.project, KINDS.post];

export interface EditorDoc {
  kind: DocKindId;
  slug: string;
  /** Slug the doc was opened with — empty for a new file */
  sourceSlug: string;
  meta: Meta;
  body: string;
}

export function createDoc(kind: DocKindId): EditorDoc {
  const defaults = { ...KINDS[kind].defaults };
  if (kind === 'post') defaults.creationDate = today();
  return {
    kind,
    slug: '',
    sourceSlug: '',
    meta: structuredClone(defaults),
    body: ''
  };
}

/** Fills in any keys the file didn't have, so every control has something to bind to. */
export function withDefaults(kind: DocKindId, meta: Meta): Meta {
  const merged: Meta = structuredClone(KINDS[kind].defaults);
  for (const [key, value] of Object.entries(meta)) merged[key] = value;

  // A single-value field written as an empty block list reads back as []
  for (const field of KINDS[kind].fields) {
    if (field.type !== 'chips' && field.type !== 'images' && Array.isArray(merged[field.key])) {
      merged[field.key] = (merged[field.key] as unknown[])[0] ?? '';
    }
  }
  return merged;
}

/** Frontmatter in the order the schema declares, so exports match the existing files. */
export function orderedMeta(doc: EditorDoc): Meta {
  const kind = KINDS[doc.kind];
  const ordered: Meta = {};
  for (const field of kind.fields) {
    const value = doc.meta[field.key];
    if (field.type === 'images' && field.key === 'images') {
      ordered[field.key] = Array.isArray(value) ? value.filter(Boolean) : [];
    } else if (field.type === 'chips') {
      ordered[field.key] = Array.isArray(value) ? value.filter(Boolean) : [];
    } else {
      ordered[field.key] = value;
    }
  }
  // Keep anything the file had that the schema doesn't know about
  for (const [key, value] of Object.entries(doc.meta)) {
    if (!(key in ordered)) ordered[key] = value;
  }
  return ordered;
}

export function docTitle(doc: EditorDoc): string {
  const value = doc.meta[KINDS[doc.kind].titleKey];
  return typeof value === 'string' && value.trim() ? value.trim() : 'Untitled';
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['’"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function today(): string {
  const now = new Date();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const day = `${now.getDate()}`.padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}
