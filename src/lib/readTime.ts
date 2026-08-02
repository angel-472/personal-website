const WORDS_PER_MINUTE = 200;

/** Rough minutes-to-read for a markdown body, code blocks and syntax discounted. */
export function readTime(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#>*_`~\[\]()]/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Same, for a whole file that still has its frontmatter block on top. */
export function readTimeFromFile(source: string): number {
  return readTime(source.replace(/^---\r?\n[\s\S]*?\r?\n---/, ''));
}
