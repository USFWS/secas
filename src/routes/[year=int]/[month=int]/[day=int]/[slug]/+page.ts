import { error as errorHandler } from '@sveltejs/kit'

import type { EntryGenerator } from './$types'

export const load = async ({ params: { year, month, day, slug } }) => {
	try {
		const { default: content, metadata } = await import(
			`$content/blog/${year}/${month}/${day}/${slug}/post.md`
		)

		let heroImage = null

		try {
			heroImage = (
				await import(
					`$content/blog/${year}/${month}/${day}/${slug}/hero.jpg?format=avif;webp;jpg&w=3200;1920;720&as=picture`
				)
			)?.default
		} catch {
			// no-op
		}

		return {
			content,
			metadata,
			heroImage
		}
	} catch {
		errorHandler(404, 'Page not found')
	}
}

// FIXME:
export const entries: EntryGenerator = async () => {
	const paths = await import.meta.glob('$content/blog/*/*/*/*/post.md', { eager: false })
	console.log('gen paths', paths)

	return Object.keys(paths).map((path) => {
		const [year, month, day, slug] = path.split('/').slice(-5, -1)
		return {
			year,
			month,
			day,
			slug
		}
	})
}
