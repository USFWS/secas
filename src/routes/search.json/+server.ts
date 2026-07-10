import { json } from '@sveltejs/kit'
import { compile } from 'html-to-text'

import { extractBlogParams, sortPosts } from '$lib/components/blog'
import type { BlogPost } from '$lib/components/blog/types'

export const prerender = true

const htmlToText = compile({ wordwrap: false })

export const GET = async () => {
	const allPosts = import.meta.glob('$content/blog/published/*.md', { eager: true })
	const paths = Object.keys(allPosts).sort(sortPosts)
	const posts = paths.map((path) => {
		const { metadata } = allPosts[path] as BlogPost
		const { year, month, day, slug } = extractBlogParams(path)
		const date = new Date(
			parseInt(year, 10),
			parseInt(month, 10) - 1,
			parseInt(day, 10)
		).toLocaleDateString()
		return {
			title: metadata.title,
			author: metadata.author,
			description: htmlToText(metadata.excerpt || ''),
			url: `/${year}/${month}/${day}/${slug}/`,
			date
		}
	})

	return json(posts, {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	})
}
