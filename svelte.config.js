import adapter from "@sveltejs/adapter-cloudflare";

import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki/bundle/web'

/** @type {import('mdsvex').MdsvexOptions} */
const mdSvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await createHighlighter({
				themes: ['one-dark-pro'],
				langs: ['javascript', 'typescript']
			})
			await highlighter.loadLanguage('javascript', 'typescript')
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'one-dark-pro' }))
			return `{@html \`${html}\` }`
		}
	},
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	},
	preprocess: [mdsvex(mdSvexOptions)],
	extensions: ['.svelte', '.md']
};

export default config;