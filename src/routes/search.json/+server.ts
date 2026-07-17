import { json } from '@sveltejs/kit'
import { compile } from 'html-to-text'

import { allPosts, loadPosts, sortPosts } from '$lib/components/blog'

export const prerender = true

const htmlToText = compile({ wordwrap: false })

export const GET = async () => {
	const paths = Object.keys(allPosts).sort(sortPosts)
	const posts = (await loadPosts(allPosts, paths, true)).map(
		({ metadata: { title, author, excerpt, slug, year, month, day } }) => ({
			title,
			author,
			description: htmlToText(excerpt || ''),
			url: `/${year}/${month}/${day}/${slug}`,
			date: new Date(
				parseInt(year, 10),
				parseInt(month, 10) - 1,
				parseInt(day, 10)
			).toLocaleDateString()
		})
	)

	return json(posts, {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	})
}
