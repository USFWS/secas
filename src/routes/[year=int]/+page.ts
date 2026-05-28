import { extractBlogParams, loadPosts, sortPosts } from '$lib/components/blog'

import type { EntryGenerator } from './$types'

export const load = async ({ params: { year } }) => {
	const allPosts = import.meta.glob('$content/blog/*.md', { eager: false })

	const paths = Object.keys(allPosts)
		.filter((path) => path.split('/').slice(-1)[0].slice(0, 4) === year)
		.sort(sortPosts)

	const posts = loadPosts(allPosts, paths)

	return {
		posts
	}
}

export const entries: EntryGenerator = async () => {
	const allPosts = import.meta.glob('$content/blog/*.md', { eager: false })
	const years = new Set(Object.keys(allPosts).map((path) => extractBlogParams(path).year))
	return [...years].map((year) => ({ year: year as string }))
}
