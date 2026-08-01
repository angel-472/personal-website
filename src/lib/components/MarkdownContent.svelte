<!-- Wraps rendered markdown (project sheets + blog posts) in the site's prose styling -->
<script lang="ts">
  let { children } = $props();
</script>

<div class="md-content">
  {@render children()}
</div>

<!-- Styles for rendered markdown -->
<style>
  .md-content {
    color: #3f3f46; /* zinc-700 */
    font-family: 'Google Sans', sans-serif;
  }

  /* Typography */
  .md-content :global(h1),
  .md-content :global(h2),
  .md-content :global(h3),
  .md-content :global(h4) {
    color: #18181b; /* zinc-900 */
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
    color: #52525b; /* zinc-600 */
  }

  /* Links */
  .md-content :global(a) {
    font-weight: 700;
    color: #18181b; /* zinc-900 */
    text-decoration-line: underline;
    text-underline-offset: 4px;
    text-decoration-color: #d4d4d8; /* zinc-300 */
    transition: color 0.2s, text-decoration-color 0.2s;
  }

  .md-content :global(a:hover) {
    color: #52525b; /* zinc-600 */
    text-decoration-color: #71717a; /* zinc-500 */
  }

  /* Lists */
  .md-content :global(ul),
  .md-content :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    font-size: 1.0625rem;
    line-height: 1.75;
    color: #52525b; /* zinc-600 */
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
    border-left: 2px solid #d4d4d8; /* zinc-300 */
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    font-size: 1.1875rem;
    color: #71717a; /* zinc-500 */
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

  .md-content :global(code) {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    background-color: #e4e4e7; /* zinc-200 */
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.85em;
    color: #18181b; /* zinc-900 */
  }

  .md-content :global(pre code) {
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    font-size: 1em;
    color: #f4f4f5; /* zinc-100 */
  }

  /* Dividers */
  .md-content :global(hr) {
    border: 0;
    border-top: 1px solid #e4e4e7; /* zinc-200 */
    margin: 3rem auto;
    width: 60%;
  }
</style>
