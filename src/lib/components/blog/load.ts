import type { BlogPost } from './types'
import { extractBlogParams } from './utils'
import { loadThumbnailImage } from '$lib/components/images'

export const loadPost = async (
	allPosts: Record<string, () => Promise<unknown>>,
	path: string,
	published: boolean = true
) => {
	const { default: content, metadata } = (await allPosts[path]()) as BlogPost

	const heroImage = metadata?.hero?.name ? await loadThumbnailImage(metadata?.hero?.name) : null

	return {
		content,
		metadata: { ...metadata, ...extractBlogParams(path, published), published },
		path,
		heroImage
	}
}

export const loadPosts = async (
	allPosts: Record<string, () => Promise<unknown>>,
	paths: string[],
	published: boolean = true
) => Promise.all(paths.map((path) => loadPost(allPosts, path, published)))
