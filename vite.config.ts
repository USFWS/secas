import path from 'path'
import { mdsvex } from 'mdsvex'
import adapter from '@sveltejs/adapter-static'
import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { enhancedImages } from '@sveltejs/enhanced-img'
import { defineConfig } from 'vite'
import { config as dotEnvConfig } from 'dotenv'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { transformCSV } from './src/lib/transformCSV.js'
import { transformMarkdownHTML } from './src/lib/components/markdown/rehype.js'

// have to configure dotenv to load correct .env file
dotEnvConfig({ path: `.env.${process.env.NODE_ENV}` })

export default defineConfig({
	plugins: [
		transformCSV,
		viteStaticCopy({
			targets: [
				// copy image folders to root of site for external access
				{
					src: path.resolve(import.meta.dirname, './content/images'),
					dest: '',
					rename: { stripBase: 1 }
				},
				{
					src: path.resolve(import.meta.dirname, './content/pdf'),
					dest: '',
					rename: { stripBase: 1 }
				},
				{
					src: path.resolve(import.meta.dirname, './content/tiles'),
					dest: '',
					rename: { stripBase: 1 }
				},
				// copy and rename geojson files to project IDs
				{
					src: path.resolve(import.meta.dirname, './content/projects/**/boundary.json'),
					dest: '_boundaries',
					rename: { stripBase: 2 }
				}
			]
		}),
		enhancedImages(),
		tailwindcss(),
		sveltekit({
			alias: {
				// TODO: migrate to #lib: https://svelte.dev/docs/kit/migrating-to-sveltekit-3
				$lib: path.resolve(import.meta.dirname, 'src/lib')
			},
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
				warningFilter: (warning) =>
					!warning.filename?.includes('node_modules') &&
					warning.code !== 'script_context_deprecated' &&
					warning.code !== 'a11y_img_redundant_alt'
			},
			adapter: adapter({
				pages: 'public',
				assets: 'public',
				fallback: '404.html',
				precompress: false,
				strict: true
			}),
			paths: {
				// set proper path on github pages if deploying to path
				// @ts-expect-error DEPLOY_PATH is OK
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
		})
	],
	resolve: {
		alias: {
			$content: path.resolve(import.meta.dirname, './content'),
			$images: path.resolve(import.meta.dirname, './content/images'),
			$pdf: path.resolve(import.meta.dirname, './content/pdf')
		}
	},

	server: {
		fs: {
			allow: [path.resolve(import.meta.dirname, './content')]
		}
	}
})
