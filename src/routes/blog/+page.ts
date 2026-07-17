import { resolve } from '$app/paths'

import { allPosts, loadPosts, sortPosts } from '$lib/components/blog'

const POSTS_PER_PAGE = 10

export const load = async () => {
	const paths = Object.keys(allPosts).sort(sortPosts)

	const numPages = Math.ceil(Object.keys(allPosts).length / POSTS_PER_PAGE) - 1

	const pages = [{ url: resolve('/blog/') }].concat(
		[...Array(numPages).keys()].map((p) => ({
			url: resolve(`/blog/page/${p + 2}`)
		}))
	)

	// count posts by year
	const postsByYear: Record<string, number> = {}
	paths.forEach((path: string) => {
		const year = parseInt(path.split('/').slice(-1)[0].slice(0, 4), 10)
		postsByYear[year] = (postsByYear[year] || 0) + 1
	})

	const posts = loadPosts(allPosts, paths.slice(0, POSTS_PER_PAGE))

	return {
		posts,
		postsByYear,
		pages
	}
}
