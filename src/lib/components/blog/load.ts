import type { BlogPost } from '$lib/components/blog/types'
import { extractBlogParams } from '$lib/components/blog'
import { loadThumbnailImage } from '$lib/components/images'

export const loadPost = async (allPosts: Record<string, () => Promise<unknown>>, path: string) => {
	const { default: content, metadata } = (await allPosts[path]()) as BlogPost

	const heroImage = metadata?.hero?.name ? await loadThumbnailImage(metadata?.hero?.name) : null

	return {
		content,
		metadata: { ...metadata, ...extractBlogParams(path) },
		path,
		heroImage
	}
}

export const loadPosts = async (
	allPosts: Record<string, () => Promise<unknown>>,
	paths: string[]
) => Promise.all(paths.map((path) => loadPost(allPosts, path)))
