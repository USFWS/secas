import { extractBlogParams, sortPosts } from '$lib/components/blog'
import type { BlogPost } from '$lib/components/blog/types'

import { SITE_NAME, SITE_URL } from '$lib/env'

export const prerender = true

const description =
	'Through the Southeast Conservation Adaptation Strategy (SECAS), diverse partners are working together to design and achieve a connected network of lands and waters that supports thriving fish and wildlife populations and improved quality of life for people across the southeastern United States and Caribbean.'

const buildDate = new Date().toISOString()

const xml = (posts: BlogPost[]) => `<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <id>${SITE_URL}/</id>
	<language>en-us</language>
    <title>${SITE_NAME}</title>
    <description>${description}</description>
    <link>${SITE_URL}/</link>
    <link href="${SITE_URL}/feed.xml" rel="self" />
	<image>
		<url>${SITE_URL}/images/SECAS_logo_vertical.png</url>
		<title>SECAS logo</title>
		<link>${SITE_URL}/</link>
	</image>
	<pubDate>${buildDate}</pubDate>
	<lastBuildDate>${buildDate}</lastBuildDate>
    <author><name>${SITE_NAME}</name></author>
    <generator>Svelte</generator>
${posts
	.map(
		({ metadata: { title, url, date, excerpt } }) => `    <item>
        <title>${title.replace('& ', '&amp; ')}</title>
		<link href="${url}"/>
		<id>${url}</id>
		<updated>${date.toISOString()}</updated>
		<published>${date.toISOString()}</published>
		<description><![CDATA[${excerpt}]]></description>
      </item>`
	)
	.join('\n')}
  </channel>
  </rss>`

export const GET = async () => {
	const allPosts = await import.meta.glob('$content/blog/*.md', { eager: true })
	const paths = Object.keys(allPosts).sort(sortPosts)
	const posts = paths.map((path) => {
		const { year, month, day, slug } = extractBlogParams(path)
		const url = decodeURI(`${SITE_URL}/${year}/${month}/${day}/${slug}/`)
		const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10))

		const { metadata } = allPosts[path] as BlogPost

		return {
			metadata: { ...metadata, year, month, day, slug, date, url }
		}
	})

	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'application/xml'
	}

	return new Response(xml(posts), { headers })
}
