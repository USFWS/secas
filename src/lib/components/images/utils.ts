const thumbnails = import.meta.glob('$images/**', {
	eager: false,
	import: 'default',
	query: {
		format: 'avif;jpg',
		w: '720',
		as: 'picture'
	}
})

const images = import.meta.glob('$images/**', {
	eager: false,
	import: 'default',
	query: {
		format: 'avif;jpg',
		w: '3200;1600;720',
		as: 'picture'
	}
})

// return image 720px wide
export const loadThumbnailImage = async (filename: string) => {
	const keys = Object.keys(thumbnails).filter((path) => path.endsWith(filename))
	if (keys.length === 1) {
		return await thumbnails[keys[0]]()
	}
	return null
}

// load responsive image up to 3200px wide; suitable for large images and banners
export const loadImage = async (filename: string) => {
	const keys = Object.keys(images).filter((path) => path.endsWith(filename))
	if (keys.length === 1) {
		return await images[keys[0]]()
	} else if (keys.length > 1) {
		console.error('found multiple images with same filename', keys)
	}

	return null
}
