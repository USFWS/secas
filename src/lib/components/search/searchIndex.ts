import Fuse from 'fuse.js'
import { resolve } from '$app/paths'

export type SearchItem = {
	title: string
	author?: string
	description?: string
	url: string
}

export const loadIndex = async () => {
	const response = await fetch(resolve('/search.json'), { method: 'GET' })
	if (response.status !== 200) {
		throw new Error('Could not load search index')
	}

	const searchItems = (await response.json()) as SearchItem[]
	const index = new Fuse<SearchItem>(searchItems, {
		keys: [
			{ name: 'title', weight: 10 },
			{ name: 'description', weight: 3 },
			{ name: 'author', weight: 1 }
		],
		threshold: 0.25,
		includeScore: true
	})

	return index
}
