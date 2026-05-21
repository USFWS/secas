import type { BlogPost } from '$lib/components/blog/types'

import { extractBlogParams, sortPosts } from '$lib/components/blog'
import { loadThumbnailImage } from '$lib/components/images'

import type { EntryGenerator } from './$types'

export const load = async ({ params: { year } }) => {
	const allPosts = import.meta.glob('$content/blog/*.md', { eager: false })

	const paths = Object.keys(allPosts)
		.filter((path) => path.split('/').slice(-1)[0].slice(0, 4) === year)
		.sort(sortPosts)

	const posts = []
	for (const path of paths) {
		const { default: content, metadata } = (await allPosts[path]()) as BlogPost

		const heroImage = metadata?.hero?.name ? await loadThumbnailImage(metadata?.hero?.name) : null

		posts.push({
			content,
			metadata: { ...metadata, ...extractBlogParams(path) },
			path,
			heroImage
		})
	}

	return {
		posts
	}
}

export const entries: EntryGenerator = async () => {
	const allPosts = import.meta.glob('$content/blog/*.md', { eager: false })
	const years = new Set(Object.keys(allPosts).map((path) => extractBlogParams(path).year))
	return [...years].map((year) => ({ year: year as string }))
}
