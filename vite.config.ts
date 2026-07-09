import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { enhancedImages } from '@sveltejs/enhanced-img'
import { defineConfig } from 'vite'
import { config as dotEnvConfig } from 'dotenv'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { transformCSV } from './src/lib/transformCSV.js'

// have to configure dotenv to load correct .env file
dotEnvConfig({ path: `.env.${process.env.NODE_ENV}` })

export default defineConfig({
	build: {
		rolldownOptions: {
			output: {
				// split mapbox its own chunk; it is large
				codeSplitting: {
					groups: [{ test: /mapbox-gl/, name: 'mapbox-gl' }]
				}
			}
		}
	},
	plugins: [
		transformCSV,
		viteStaticCopy({
			targets: [
				// copy image folders to root of site for external access
				{ src: path.resolve(__dirname, './content/images'), dest: '', rename: { stripBase: 1 } },
				{ src: path.resolve(__dirname, './content/pdf'), dest: '', rename: { stripBase: 1 } },
				{ src: path.resolve(__dirname, './content/tiles'), dest: '', rename: { stripBase: 1 } },
				// copy and rename geojson files to project IDs
				{
					src: path.resolve(__dirname, './content/projects/**/boundary.json'),
					dest: '_boundaries',
					rename: (name, ext, fullPath) => `../../../${path.basename(path.dirname(fullPath))}.json`
				}
			]
		}),
		enhancedImages(),
		tailwindcss(),
		sveltekit(),
		// FIXME: remove
		{
			name: 'log-imports',
			transform(code, id) {
				if (id.includes('/content/blog/')) {
					console.log(`[Imported]: ${id}`)
				}
				return null
			}
		}
	],
	resolve: {
		alias: {
			$content: path.resolve(__dirname, './content'),
			$images: path.resolve(__dirname, './content/images'),
			$pdf: path.resolve(__dirname, './content/pdf')
		}
	},

	server: {
		fs: {
			allow: [path.resolve(__dirname, './content')]
		}
	}
})
