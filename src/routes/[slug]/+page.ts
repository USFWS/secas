import { error as errorHandler } from '@sveltejs/kit'

import type { EntryGenerator } from './$types'

export const load = async ({ params: { slug } }) => {
	try {
		const { default: page, metadata } = await import(`$content/pages/${slug.toLowerCase()}/page.md`)
		const { default: banner } = await import(
			`$content/pages/${slug.toLowerCase()}/banner.jpg?format=avif;webp;jpg&w=3200;1920;720&as=picture`
		)

		return {
			page,
			...metadata,
			banner
		}
	} catch {
		errorHandler(404, 'Page not found')
	}
}

export const entries: EntryGenerator = async () => {
	const paths = await import.meta.glob('$content/pages/*.md', { eager: false })
	console.log('gen paths', paths)

	return Object.keys(await import.meta.glob('$content/pages/**/page.md', { eager: false })).map(
		(path) => ({
			slug: path.slice(-3)
		})
	)
}
