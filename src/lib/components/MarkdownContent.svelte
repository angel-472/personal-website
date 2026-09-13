<!-- Wraps rendered markdown (project sheets + blog posts) in the site's prose styling -->
<script lang="ts">
  let { children } = $props();
</script>

<div class="md-content">
  {@render children()}
</div>

<!-- Styles for rendered markdown -->
<style>
  /* Every color below goes through a variable so the dark theme only has to
     restate the palette, not the rules. Code blocks stay dark in both themes --
     the highlighter ships a single dark theme (see svelte.config.js). */
  .md-content {
    --md-body: #52525b; /* zinc-600 */
    --md-heading: #18181b; /* zinc-900 */
    --md-muted: #71717a; /* zinc-500 */
    --md-rule: #e4e4e7; /* zinc-200 */
    --md-quote-bar: #d4d4d8; /* zinc-300 */
    --md-link: #18181b; /* zinc-900 */
    --md-link-hover: #52525b; /* zinc-600 */
    --md-link-underline: #d4d4d8; /* zinc-300 */
    --md-link-underline-hover: #71717a; /* zinc-500 */
    --md-code-bg: #e4e4e7; /* zinc-200 */
    --md-code-text: #18181b; /* zinc-900 */

    color: #3f3f46; /* zinc-700 */
    font-family: 'Google Sans', sans-serif;
  }

  :global([data-theme='dark']) .md-content {
    --md-body: #d4d4d8; /* zinc-300 */
    --md-heading: #fafafa; /* zinc-50 */
    --md-muted: #a1a1aa; /* zinc-400 */
    --md-rule: #27272a; /* zinc-800 */
    --md-quote-bar: #3f3f46; /* zinc-700 */
    --md-link: #fafafa; /* zinc-50 */
    --md-link-hover: #a1a1aa; /* zinc-400 */
    --md-link-underline: #52525b; /* zinc-600 */
    --md-link-underline-hover: #a1a1aa; /* zinc-400 */
    --md-code-bg: #27272a; /* zinc-800 */
    --md-code-text: #fafafa; /* zinc-50 */

    color: #d4d4d8; /* zinc-300 */
  }

  /* Typography */
  .md-content :global(h1),
  .md-content :global(h2),
  .md-content :global(h3),
  .md-content :global(h4) {
    color: var(--md-heading);
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    line-height: 1.2;
    font-weight: 700;
    letter-spacing: -0.02em; /* tracking-tight */
  }

  .md-content :global(h1) {
    font-size: 2.25rem;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }

  .md-content :global(h2) {
    font-size: 1.625rem;
  }

  .md-content :global(h3) {
    font-size: 1.3rem;
  }

  .md-content :global(p) {
    font-size: 1.0625rem;
    line-height: 1.75;
    margin-bottom: 1.5rem;
    color: var(--md-body);
  }

  /* Links */
  .md-content :global(a) {
    font-weight: 700;
    color: var(--md-link);
    text-decoration-line: underline;
    text-underline-offset: 4px;
    text-decoration-color: var(--md-link-underline);
    transition: color 0.2s, text-decoration-color 0.2s;
  }

  .md-content :global(a:hover) {
    color: var(--md-link-hover);
    text-decoration-color: var(--md-link-underline-hover);
  }

  /* Lists */
  .md-content :global(ul),
  .md-content :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    font-size: 1.0625rem;
    line-height: 1.75;
    color: var(--md-body);
  }

  .md-content :global(ul) {
    list-style-type: disc;
  }

  .md-content :global(ol) {
    list-style-type: decimal;
  }

  .md-content :global(li) {
    margin-bottom: 0.5rem;
  }

  /* Quotes */
  .md-content :global(blockquote) {
    border-left: 2px solid var(--md-quote-bar);
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    font-size: 1.1875rem;
    color: var(--md-muted);
  }

  /* Media */
  .md-content :global(img),
  .md-content :global(video) {
    max-width: 100%;
    height: auto;
    margin: 2.5rem 0;
    border-radius: 1rem; /* rounded-2xl, matches site cards */
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
  }

  /* Code */
  .md-content :global(pre) {
    background-color: #18181b; /* zinc-900, matches site's dark accent elements */
    padding: 1.25rem;
    border-radius: 1rem; /* rounded-2xl */
    overflow-x: auto;
    margin: 2rem 0;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  /* On the dark page the block would blend into the background, so it picks up
     a border instead of relying on the color difference alone. */
  :global([data-theme='dark']) .md-content :global(pre) {
    border: 1px solid #27272a; /* zinc-800 */
  }

  .md-content :global(code) {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    background-color: var(--md-code-bg);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.85em;
    color: var(--md-code-text);
  }

  .md-content :global(pre code) {
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    font-size: 0.85em;
    color: #f4f4f5; /* zinc-100 */
    overflow-x: scroll;
  }

  /* Dividers */
  .md-content :global(hr) {
    border: 0;
    border-top: 1px solid var(--md-rule);
    margin: 3rem auto;
    width: 60%;
  }
</style>
