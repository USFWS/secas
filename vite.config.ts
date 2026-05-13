import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { enhancedImages } from '@sveltejs/enhanced-img'
import { defineConfig } from 'vite'
import { config as dotEnvConfig } from 'dotenv'
import { transformCSV } from './src/lib/transformCSV.js'

// have to configure dotenv to load correct .env file
dotEnvConfig({ path: `.env.${process.env.NODE_ENV}` })

export default defineConfig({
	plugins: [transformCSV, tailwindcss(), enhancedImages(), sveltekit()],
	resolve: {
		alias: {
			$content: path.resolve(__dirname, './content')
		}
	},
	server: {
		fs: {
			allow: [path.resolve(__dirname, './content')]
		}
	}
})
