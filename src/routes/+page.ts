import type { BlogPost } from '$lib/components/blog/types'
import { extractBlogParams, sortPosts } from '$lib/components/blog'
import { loadThumbnailImage } from '$lib/components/images'

export const load = async () => {
	const allPosts = import.meta.glob('$content/blog/*.md', { eager: false })

	// only show most recent 3 posts
	const paths = Object.keys(allPosts).sort(sortPosts).slice(0, 3)

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
