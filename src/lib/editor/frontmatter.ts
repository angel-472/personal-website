// Minimal YAML frontmatter reader/writer covering the subset this site uses:
// quoted strings, numbers, booleans, inline arrays and block (`- item`) arrays.

export type Meta = Record<string, unknown>;

export interface ParsedDocument {
  meta: Meta;
  body: string;
}

const FRONTMATTER = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(\r?\n|$)/;

export function parseDocument(raw: string): ParsedDocument {
  const match = FRONTMATTER.exec(raw);
  if (!match) return { meta: {}, body: raw.trim() };
  return {
    meta: parseFrontmatter(match[1]),
    body: raw.slice(match[0].length).replace(/^\s*\n/, '').trimEnd()
  };
}

export function parseFrontmatter(src: string): Meta {
  const meta: Meta = {};
  let listKey: string | null = null;

  for (const line of src.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const item = /^\s*-\s+(.*)$/.exec(line);
    if (item && listKey) {
      (meta[listKey] as unknown[]).push(parseScalar(stripComment(item[1])));
      continue;
    }

    const entry = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
    if (!entry) continue;

    const [, key, rest] = entry;
    const value = stripComment(rest).trim();

    if (value === '') {
      // Either an empty value or the header of a block list; treat as a list
      // and collapse back to '' below if no items follow.
      meta[key] = [];
      listKey = key;
    } else if (value.startsWith('[')) {
      meta[key] = parseInlineList(value);
      listKey = null;
    } else {
      meta[key] = parseScalar(value);
      listKey = null;
    }
  }

  return meta;
}

export function serializeDocument(meta: Meta, body: string): string {
  const lines = Object.entries(meta)
    .filter(([, value]) => !isEmpty(value))
    .map(([key, value]) => `${key}: ${formatValue(value)}`);

  const frontmatter = lines.length ? `---\n${lines.join('\n')}\n---\n\n` : '';
  return `${frontmatter}${body.trim()}\n`;
}

function isEmpty(value: unknown): boolean {
  if (value === undefined || value === null) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

function formatValue(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(formatScalar).join(', ')}]`;
  return formatScalar(value);
}

function formatScalar(value: unknown): string {
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

/** Drops a trailing ` # comment`, ignoring any `#` that sits inside quotes. */
function stripComment(value: string): string {
  let quote = '';
  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    if (quote) {
      if (char === quote) quote = '';
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === '#' && (i === 0 || /\s/.test(value[i - 1]))) {
      return value.slice(0, i);
    }
  }
  return value;
}

function parseScalar(raw: string): unknown {
  const value = raw.trim();
  if (value === '' || value === '~' || value === 'null') return '';
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);

  const quote = value[0];
  if ((quote === '"' || quote === "'") && value.endsWith(quote) && value.length > 1) {
    return value
      .slice(1, -1)
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }
  return value;
}

function parseInlineList(value: string): unknown[] {
  const inner = value.replace(/^\[/, '').replace(/\]$/, '').trim();
  if (!inner) return [];
  return splitTopLevel(inner).map(parseScalar);
}

function splitTopLevel(input: string): string[] {
  const parts: string[] = [];
  let current = '';
  let quote = '';

  for (const char of input) {
    if (quote) {
      current += char;
      if (char === quote) quote = '';
    } else if (char === '"' || char === "'") {
      quote = char;
      current += char;
    } else if (char === ',') {
      parts.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim()) parts.push(current);

  return parts.map((part) => part.trim()).filter(Boolean);
}
