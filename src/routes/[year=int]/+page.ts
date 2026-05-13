import type { BlogPost } from '$lib/components/blog/types'

import { sortPosts } from '$lib/components/blog'

import type { EntryGenerator } from './$types'

export const load = async ({ params: { year } }) => {
	const allPosts = await import.meta.glob('$content/blog/*/*/*/*/post.md', { eager: false })

	const paths = Object.keys(allPosts)
		.filter((path) => path.split('/').at(3) === year)
		.sort(sortPosts)

	const posts = []
	for (const path of paths) {
		const [year, month, day, slug] = path.split('/').slice(-5, -1)
		const { default: content, metadata } = (await allPosts[path]()) as BlogPost

		// create thumbnail sized images at 2x resolution
		let heroImage = null
		try {
			heroImage = (
				await import(
					`$content/blog/${year}/${month}/${day}/${slug}/hero.jpg?format=avif;webp;jpg&w=600&as=picture`
				)
			)?.default
		} catch {
			/* no-op */
		}

		posts.push({ content, metadata: { ...metadata, year, month, day, slug }, path, heroImage })
	}

	return {
		posts
	}
}

export const entries: EntryGenerator = async () => {
	const allPosts = await import.meta.glob('$content/blog/*/*/*/*/post.md', { eager: false })
	return Object.keys(allPosts).map((path) => ({
		year: path.split('/').at(-5) as string
	}))
}
