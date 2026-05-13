import type { Component } from 'svelte'

type Frontmatter = {
	title: string
	author: string
	hero: {
		alt?: string
		caption?: string
	}
}

export type BlogPost = { default: Component; metadata: Frontmatter }
