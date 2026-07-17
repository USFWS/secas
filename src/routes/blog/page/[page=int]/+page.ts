import { goto } from '$app/navigation'
import { resolve } from '$app/paths'

import { allPosts, loadPosts, sortPosts } from '$lib/components/blog'

import type { EntryGenerator } from './$types'

const POSTS_PER_PAGE = 10

export const load = async ({ params: { page } }) => {
	const pageNum = parseInt(page, 10)
	if (pageNum === 1) {
		await goto(resolve('/blog/'))
	}

	const paths = Object.keys(allPosts).sort(sortPosts)

	const numPages = Math.ceil(Object.keys(allPosts).length / POSTS_PER_PAGE) - 1
	const pages = [{ url: resolve('/blog/') }].concat(
		[...Array(numPages).keys()].map((p) => ({
			url: resolve(`/blog/page/${p + 2}`)
		}))
	)

	const posts = loadPosts(
		allPosts,
		paths.slice((pageNum - 1) * POSTS_PER_PAGE, pageNum * POSTS_PER_PAGE)
	)

	return {
		posts,
		pages
	}
}

export const entries: EntryGenerator = async () => {
	// ignore first page, it routes to blog home
	const numPages = Math.ceil(Object.keys(allPosts).length / POSTS_PER_PAGE) - 1
	const pages = [...Array(numPages).keys()].map((p) => p + 2)
	return pages.map((page) => ({ page: page.toString() }))
}
