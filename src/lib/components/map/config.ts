import type { StyleSpecification } from 'mapbox-gl/esm'

import { browser } from '$app/environment'

export const bounds: [number, number, number, number] = [
	-106.64569497, 17.63478139, -64.44293322, 40.63868947
]

export const style: StyleSpecification = {
	version: 8,
	sources: {
		boundaries: {
			type: 'vector',
			// mapbox needs full URL to work
			url: browser
				? `${window.location.origin}${window.location.pathname.replace('/story-map/', '/tiles/boundaries.pmtiles')}`
				: ''
		},
		geojson: {
			type: 'geojson',
			data: { type: 'FeatureCollection', features: [] }
		}
	},
	layers: [
		{
			id: 'geojson-fill',
			source: 'geojson',
			type: 'fill',
			paint: {
				'fill-color': 'orange',
				'fill-opacity': 0.25
			}
		},
		{
			id: 'geojson-outline',
			source: 'geojson',
			type: 'line',
			paint: {
				'line-color': 'orange',
				'line-width': 2
			}
		},
		{
			id: 'boundaries-fill',
			type: 'fill',
			source: 'boundaries',
			'source-layer': 'boundaries',
			filter: ['==', 'id', Infinity],
			paint: {
				'fill-color': 'orange',
				'fill-opacity': 0.25
			}
		},
		{
			id: 'boundaries-outline',
			type: 'line',
			source: 'boundaries',
			'source-layer': 'boundaries',
			filter: ['==', 'id', Infinity],
			paint: {
				'line-color': 'orange',
				'line-width': 2
			}
		},

		{
			id: 'secas-boundary',
			type: 'line',
			source: 'boundaries',
			'source-layer': 'boundaries',
			filter: ['==', 'id', 'secas'],
			paint: {
				'line-color': '#000',
				'line-width': 1.5
			}
		}
	]
}
