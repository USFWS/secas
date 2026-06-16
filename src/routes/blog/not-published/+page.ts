import { loadPosts, sortPosts } from '$lib/components/blog'

export const load = async () => {
	const allPosts = import.meta.glob('$content/blog/not-published/*.md', { eager: false })
	const paths = Object.keys(allPosts).sort(sortPosts)

	const posts = loadPosts(allPosts, paths, false)

	return {
		posts
	}
}
