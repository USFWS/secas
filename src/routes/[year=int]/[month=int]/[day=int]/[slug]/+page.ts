import { error as errorHandler } from '@sveltejs/kit'

import { allPosts, extractBlogParams } from '$lib/components/blog'
import { loadImage } from '$lib/components/images'

import type { EntryGenerator } from './$types'

export const load = async ({ params: { year, month, day, slug } }) => {
	try {
		const { default: content, metadata } = await import(
			`$content/blog/published/${year}-${month}-${day}-${slug}.md`
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
	return Object.keys(allPosts).map((path) => {
		const { year, month, day, slug } = extractBlogParams(path)
		return {
			year: year.toString(),
			month: month.toString(),
			day: day.toString(),
			slug
		}
	})
}
