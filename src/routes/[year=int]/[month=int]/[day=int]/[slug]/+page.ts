import { error as errorHandler } from '@sveltejs/kit'

import { loadImage } from '$lib/components/images'

import type { EntryGenerator } from './$types'

export const load = async ({ params: { year, month, day, slug } }) => {
	try {
		const { default: content, metadata } = await import(
			`$content/blog/${year}/${month}/${day}/${slug}/post.md`
		)

		const heroImage = metadata?.hero?.name ? await loadImage(metadata?.hero?.name) : null

		return {
			content,
			metadata,
			heroImage
		}
	} catch {
		errorHandler(404, 'Page not found')
	}
}

export const entries: EntryGenerator = async () => {
	const paths = await import.meta.glob('$content/blog/*/*/*/*/post.md', { eager: false })
	return Object.keys(paths).map((path) => {
		const [year, month, day, slug] = path.split('/').slice(-5, -1)
		return {
			year,
			month,
			day,
			slug
		}
	})
}
