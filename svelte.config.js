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
			!warning.filename?.includes('node_modules') &&
			warning.code !== 'script_context_deprecated' &&
			warning.code !== 'a11y_img_redundant_alt'
	},
	kit: {
		adapter: adapter({
			pages: 'public',
			assets: 'public',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		paths: {
			// set proper path on github pages if deploying to path
			base: process.env.DEPLOY_PATH || ''
		},
		prerender: {
			handleUnseenRoutes: 'fail',
			handleMissingId: ({ path, message }) => {
				// can ignore those in projects because they are used to
				// load projects dynamically
				if (path === '/story-map/') {
					return
				}
				throw new Error(message)
			}
		}
	},
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			remarkPlugins: [],
			rehypePlugins: [transformMarkdownHTML]
		}),
		vitePreprocess()
	],
	extensions: ['.svelte', '.md']
}

export default config
