import { loadPosts, sortPosts } from '$lib/components/blog'

export const load = async () => {
	const allPosts = import.meta.glob('$content/blog/*.md', { eager: false })

	// only show most recent 3 posts
	const paths = Object.keys(allPosts).sort(sortPosts).slice(0, 3)
	const posts = await loadPosts(allPosts, paths)

	return {
		posts
	}
}
