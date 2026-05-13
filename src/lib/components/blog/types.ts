import type { Snippet } from 'svelte'

type Frontmatter = {
	title: string
	author: string
	hero: {
		alt?: string
		caption?: string
	}
}

export type BlogPost = { default: Snippet; metadata: Frontmatter }
