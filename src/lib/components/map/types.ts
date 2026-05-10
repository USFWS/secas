type Banner = {
    credits: string
    url?: string
    label?: string

    // added dynamically
    src: object
}

export type Project = {
    // added dynamically based on path
    id: string

    // from project.md frontmatter
    title: string
    summary: string
    date: string
    banner: Banner
    latitude: number
    longitude: number
    boundary_ids?: string[]
    bounds?: number[] // calculated automatically from boundary
    photo_caption: string
    photo_url?: string | null | undefined

    // from project.md content
    content: any

    // from associated banner.jpg
    photo: string

    // from associated boundary.json (OPTIONAL)
    boundary?: string

    photo_position?: string // top, center, bottom
}
