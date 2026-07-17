import { allPosts, extractBlogParams } from '$lib/components/blog'

import { SITE_URL } from '$lib/env'

export const prerender = true

const urlElement = (path: string) => `<url><loc>${SITE_URL}${path}</loc></url>`

const xml = (paths: string[]) => {
	return `
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${paths.map(urlElement).join('\n')}
		</urlset>`
}

export const GET = async () => {
	const pagePaths: string[] = [
		'/',
		'/about/',
		'/blog/',
		'/blueprint/',
		'/blueprint-contribute-data/',
		'/blueprint-data-download/',
		'/blueprint-indicators/',
		'/blueprint-state-reports/',
		'/committees/',
		'/events/',
		'/our-goal/',
		'/partners/',
		'/resources/',
		'/staff/',
		'/story-map/',
		'/subscribe/',
		'/workshops/'
	]

	const postPaths: string[] = Object.keys(allPosts).map((path) => {
		const { year, month, day, slug } = extractBlogParams(path)
		return `/${year}/${month}/${day}/${slug}/`
	})

	return new Response(xml(pagePaths.concat(postPaths)).trim(), {
		headers: {
			'Content-Type': 'application/xml'
		}
	})
}
