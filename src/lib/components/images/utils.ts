// return image 600px wide
export const loadThumbnailImage = async (filename: string) => {
	const images = await import.meta.glob('$content/images/*', {
		eager: false,
		query: {
			format: 'avif;webp;jpg',
			w: '600',
			as: 'picture'
		}
	})
	const keys = Object.keys(images).filter((path) => path.endsWith(filename))
	if (keys.length === 1) {
		// @ts-expect-error default is fine
		return (await images[keys[0]]())?.default
	}
	return null
}

// load responsive image up to 3200px wide; suitable for large images and banners
export const loadImage = async (filename: string) => {
	const images = await import.meta.glob('$content/images/*', {
		eager: false,
		query: {
			format: 'avif;webp;jpg',
			w: '3200;1920;720',
			as: 'picture'
		}
	})
	const keys = Object.keys(images).filter((path) => path.endsWith(filename))
	if (keys.length === 1) {
		// @ts-expect-error default is fine
		return (await images[keys[0]]())?.default
	}
	return null
}
