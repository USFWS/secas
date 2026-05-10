import { bbox as calculateBounds } from '@turf/bbox'
import type { AllGeoJSON } from '@turf/helpers'

import type { Project } from '$lib/components/map/types'

import { indexBy } from '$lib/util/data'

export const load = () => {
	const images = import.meta.glob('$content/projects/**/banner.jpg', {
		eager: true,
		import: 'default'
	})
	const boundaries = import.meta.glob('$content/projects/**/boundary.json', {
		eager: true,
		import: 'default'
	})
	const paths = import.meta.glob('$content/projects/**/project.md', { eager: true })

	const projects = []

	for (const path in paths) {
		const file = paths[path]
		const id = path.split('/').at(-2)
		if (id && file && typeof file === 'object' && 'metadata' in file) {
			const metadata = file.metadata as Omit<Project, 'id'>
			const imageKey = Object.keys(images).filter((m) => m.split('/').at(-2) === id)[0]
			const boundaryKey = Object.keys(boundaries).filter((m) => m.split('/').at(-2) === id)[0]

			let bounds = null
			const boundary = boundaries[boundaryKey]
			if (boundary) {
				bounds = calculateBounds(boundary as AllGeoJSON)
			}

			projects.push({
				...metadata,
				id,
				date: new Date(metadata.date),
				photo: images[imageKey],
				boundary,
				bounds: metadata.bounds || bounds,
				// load parsed markdown content
				content: file.default
			})
		}
	}

	// sort by descending date
	projects.sort(({ date: a }, { date: b }) => (a > b ? -1 : 1))

	return { projects, projectIndex: indexBy(projects, 'id') }
}
