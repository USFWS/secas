import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { loadConfig } from '@sveltejs/load-config'
import svelte from 'eslint-plugin-svelte'
import { includeIgnoreFile, defineConfig } from 'eslint/config'
import globals from 'globals'
import ts from 'typescript-eslint'

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url))
const svelteConfig = (await loadConfig('./', { traverse: false }))?.config

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	{ ignores: ['**/*.ts', '**/*.js', 'node_modules/**'] },
	js.configs.recommended,
	ts.configs.recommended,
	svelte.configs.recommended,
	{
		files: ['**/*.svelte', '**/*.svelte.ts'],
		ignores: ['node_modules/**'],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		},
		rules: {
			'no-undef': 'off'
		}
	}
)
