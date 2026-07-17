import { loadImage } from '$lib/components/images'

export const load = async () => {
	const slug = 'organizations-using-the-blueprint'
	const { default: page, metadata } = await import(`$content/pages/${slug}.md`)
	const heroImage = metadata?.hero?.name ? await loadImage(metadata?.hero?.name) : null

	return {
		page,
		...metadata,
		heroImage
	}
}
