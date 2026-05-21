import { mdsvex } from 'mdsvex'
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { transformMarkdownHTML } from './src/lib/components/markdown/rehype.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true),
		warningFilter: (warning) =>
			!warning.filename?.includes('node_modules') && warning.code !== 'script_context_deprecated'
	},
	kit: {
		adapter: adapter({
			pages: 'public',
			assets: 'public',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),
		paths: {
			// set proper path on github pages if deploying to path
			base: process.env.DEPLOY_PATH || ''
		},
		prerender: {
			handleUnseenRoutes: 'warn'
		}
	},
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			remarkPlugins: [],
			rehypePlugins: [transformMarkdownHTML]
		})
	],
	extensions: ['.svelte', '.md']
}

export default config
