import { error as errorHandler } from '@sveltejs/kit'

import { extractBlogParams, extractDate } from '$lib/components/blog'
import { loadImage } from '$lib/components/images'

import type { EntryGenerator } from './$types'

export const load = async ({ params: { slug } }) => {
	try {
		const { default: content, metadata } = await import(`$content/blog/draft/${slug}.md`)

		const heroImage = metadata?.hero?.name ? await loadImage(metadata?.hero?.name) : null

		return {
			content,
			metadata: { ...metadata, ...extractDate(slug) },
			heroImage
		}
	} catch {
		errorHandler(404, 'Page not found')
	}
}

export const entries: EntryGenerator = async () => {
	const paths = import.meta.glob('$content/blog/draft/*.md', { eager: false })
	return Object.keys(paths).map((path) => {
		const { year, month, day, slug } = extractBlogParams(path)
		return {
			slug: `${year}-${month}-${day}-${slug}`
		}
	})
}
