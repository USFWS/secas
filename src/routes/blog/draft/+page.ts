import { allUnpublishedPosts, loadPosts, sortPosts } from '#lib/components/blog/index.js'

export const load = async () => {
	const paths = Object.keys(allUnpublishedPosts).sort(sortPosts)
	const posts = loadPosts(allUnpublishedPosts, paths, false)

	return {
		posts
	}
}
