import { error as errorHandler } from '@sveltejs/kit'

import { loadImage } from '$lib/components/images'
import type { EntryGenerator } from './$types'

export const load = async ({ params: { slug } }) => {
	try {
		const { default: page, metadata } = await import(`$content/pages/${slug}.md`)
		const heroImage = metadata?.hero?.name ? await loadImage(metadata?.hero?.name) : null

		return {
			page,
			...metadata,
			heroImage
		}
	} catch {
		errorHandler(404, 'Page not found')
	}
}

export const entries: EntryGenerator = async () => {
	return Object.keys(import.meta.glob('$content/pages/*.md', { eager: false })).map((path) => ({
		slug: path.slice(-3)
	}))
}
