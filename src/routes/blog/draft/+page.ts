import { allUnpublishedPosts, loadPosts, sortPosts } from '$lib/components/blog'

export const load = async () => {
	const paths = Object.keys(allUnpublishedPosts).sort(sortPosts)
	const posts = loadPosts(allUnpublishedPosts, paths, false)

	return {
		posts
	}
}
