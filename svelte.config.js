import { mdsvex } from 'mdsvex'
import rehypeExternalLinks from 'rehype-external-links'
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
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
		alias: {
			$content: 'content'
		}
	},
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]]
		})
	],
	extensions: ['.svelte', '.md']
}

export default config
