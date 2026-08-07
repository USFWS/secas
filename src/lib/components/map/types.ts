import type { Component } from 'svelte'

type Banner = {
	credits: string
	url?: string
	label?: string

	// added dynamically
	src: object
}

type BannerPosition = 'top' | 'center' | 'bottom' | null

export type Project = {
	// added dynamically based on path
	id: string

	// from project.md frontmatter
	title: string
	summary: string
	date: Date
	banner: Banner
	latitude: number
	longitude: number
	boundary_ids?: string[]
	bounds?: number[] // calculated automatically from boundary
	hero?: {
		alt?: string | null
		caption?: string | null
		url?: string | null
		position?: BannerPosition
	}

	// from project.md content
	content: Component

	// from associated banner.jpg
	photo: string

	// from associated boundary.json (OPTIONAL)
	boundary?: string
}
