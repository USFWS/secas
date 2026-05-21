import type { BlogPost } from '$lib/components/blog/types'

import { extractBlogParams, sortPosts } from '$lib/components/blog'
import { loadThumbnailImage } from '$lib/components/images'

export const load = async () => {
	const allPosts = import.meta.glob('$content/blog/*.md', { eager: false })

	let paths = Object.keys(allPosts).sort(sortPosts)

	// only show posts for the most recent year in which there are posts
	if (paths.length > 1) {
		const year = paths[0].split('/').at(-5)
		paths = paths.filter((path) => path.split('/').at(-5) === year)
	}

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
