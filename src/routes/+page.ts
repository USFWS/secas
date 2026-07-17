import { allPosts, loadPosts, sortPosts } from '$lib/components/blog'

export const load = async () => {
	// only show most recent 3 posts
	const paths = Object.keys(allPosts).sort(sortPosts).slice(0, 3)
	const posts = await loadPosts(allPosts, paths)

	return {
		posts
	}
}
