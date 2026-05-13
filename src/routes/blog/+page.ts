import type { BlogPost } from '$lib/components/blog/types'

import { sortPosts } from '$lib/components/blog'

export const load = async () => {
	const allPosts = await import.meta.glob('$content/blog/*/*/*/*/post.md', { eager: false })

	let paths = Object.keys(allPosts).sort(sortPosts)

	// only show posts for the most recent year in which there are posts
	if (paths.length > 1) {
		const year = paths[0].split('/').at(-5)
		paths = paths.filter((path) => path.split('/').at(-5) === year)
	}

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
