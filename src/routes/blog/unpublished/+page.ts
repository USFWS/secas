import { loadPosts, sortPosts } from '$lib/components/blog'

export const load = async () => {
	console.log('before import unpublished')
	const allPosts = import.meta.glob('$content/blog/unpublished/*.md', { eager: false })
	const paths = Object.keys(allPosts).sort(sortPosts)

	console.log('unpublished posts', allPosts)

	const posts = loadPosts(allPosts, paths, false)

	console.log('loaded posts', posts)

	return {
		posts
	}
}
