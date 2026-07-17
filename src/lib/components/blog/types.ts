import type { Component } from 'svelte'

type Frontmatter = {
	title: string
	author: string
	excerpt?: string
	hero: {
		name?: string
		alt?: string
		caption?: string
	}
}

export type BlogPost = { default: Component; metadata: Frontmatter }
