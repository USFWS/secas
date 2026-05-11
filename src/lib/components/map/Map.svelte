<script lang="ts">
	import { untrack } from 'svelte'
	import { onMount, onDestroy } from 'svelte'
	// import { Map as MapboxGLMap, NavigationControl, Marker, Popup } from 'mapbox-gl/esm'
	import mapboxgl from 'mapbox-gl/esm'
	import type { Map as MapboxGLMapType } from 'mapbox-gl/esm'
	import 'mapbox-gl/dist/mapbox-gl.css'

	import { MAPBOX_TOKEN } from '$lib/env'
	import type { Project } from './types'

	import { bounds, style } from './config'
	import { getCenterAndZoom } from './viewport'

	const { Map: MapboxGLMap, NavigationControl, Marker, Popup } = mapboxgl

	const { projects: rawProjects, selectedProject, onMarkerClick } = $props()

	// intentionally only using the first load of projects
	const projects = untrack(() => rawProjects)

	let mapContainer: HTMLDivElement
	let map: MapboxGLMapType
	let southeast: { center: [number, number]; zoom: number }

	style.sources.geojson.data = {
		type: 'FeatureCollection',
		features: projects.map(({ id, boundary }: Project) => ({
			type: 'Feature',
			geometry: boundary,
			properties: {
				id
			}
		}))
	}

	onMount(() => {
		southeast = getCenterAndZoom(mapContainer, bounds, 0)

		map = new MapboxGLMap({
			container: mapContainer,
			accessToken: MAPBOX_TOKEN,
			style: 'mapbox://styles/mapbox/light-v9',
			...(selectedProject
				? getCenterAndZoom(mapContainer, selectedProject.bounds, 0.05)
				: southeast)
		})

		map.addControl(new NavigationControl({ showCompass: false }), 'top-right')

		window.map = map

		map.once('style.load', () => {
			// hide Gulf of Mexico per US federal requirements (2025)
			if (map!.style!._layers['marine-label-md-pt']) {
				map.setFilter('marine-label-md-pt', [
					'all',
					['==', '$type', 'Point'],
					['in', 'labelrank', 2, 3],
					['!=', 'name', 'Gulf of Mexico']
				])
			}
		})

		map.on('load', () => {
			// add fallback content for canvas
			map._canvas.setAttribute('aria-label', 'interactive map showing SECAS project locations')

			// add full extent button manually so it has proper tab order
			const button = document.createElement('button')
			button.onclick = zoomFullExtent
			button.title = 'zoom to full extent'
			button.tabIndex = 0

			const span = document.createElement('span')
			span.classList = 'mapboxgl-ctrl-icon'
			// from @lucide/svelte/icons/maximize-2
			span.style =
				'background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1heGltaXplMi1pY29uIGx1Y2lkZS1tYXhpbWl6ZS0yIj48cGF0aCBkPSJNMTUgM2g2djYiLz48cGF0aCBkPSJtMjEgMy03IDciLz48cGF0aCBkPSJtMyAyMSA3LTciLz48cGF0aCBkPSJNOSAyMUgzdi02Ii8+PC9zdmc+);'
			button.appendChild(span)

			const container = document.querySelector('.mapboxgl-ctrl-top-right .mapboxgl-ctrl-group')
			container?.appendChild(button)

			// add sources
			Object.entries(style.sources).forEach(([id, source]) => {
				map.addSource(id, source)
			})

			style.layers.forEach((layer) => {
				map.addLayer(layer)
			})

			// add marker for each project
			projects.forEach(({ id, title, latitude, longitude }: Project) => {
				const marker = new Marker()
					.setLngLat([longitude, latitude])
					.setPopup(new Popup({ closeButton: false }).setHTML(title))
					.addTo(map)

				if (selectedProject && selectedProject.id === id) {
					marker.addClassName('visited')
				}

				const element = marker.getElement()
				element.setAttribute('aria-label', `map marker for ${title}`)

				element.addEventListener('click', (e) => {
					e.stopPropagation()
					onMarkerClick(id)
					marker.addClassName('visited')
				})

				element.addEventListener('mouseenter', (e) => {
					e.stopPropagation()
					marker.togglePopup()
				})

				element.addEventListener('mouseleave', (e) => {
					e.stopPropagation()
					marker.togglePopup()
				})
			})
		})
	})

	$effect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		selectedProject

		if (!map) {
			return
		}

		map.resize()

		const updateVisibleProject = () => {
			if (selectedProject) {
				const {
					id,
					bounds: projectBounds,
					boundary: projectBoundary,
					boundary_ids: boundaryIds
				} = selectedProject
				if (projectBounds) {
					map.flyTo({ ...getCenterAndZoom(mapContainer, selectedProject.bounds, 0.05) })
				}

				if (projectBoundary) {
					map.setFilter('geojson-outline', ['==', 'id', id])
					map.setFilter('geojson-fill', ['==', 'id', id])
				} else if (boundaryIds) {
					map.setFilter('boundaries-outline', ['in', 'id', ...boundaryIds])
					map.setFilter('boundaries-fill', ['in', 'id', ...boundaryIds])
				}
			} else {
				map.flyTo({ ...southeast })
				map.setFilter('geojson-outline', ['==', 'id', Infinity])
				map.setFilter('geojson-fill', ['==', 'id', Infinity])
				map.setFilter('boundaries-outline', ['==', 'id', Infinity])
				map.setFilter('boundaries-fill', ['==', 'id', Infinity])
			}
		}

		if (map.loaded()) {
			updateVisibleProject()
		} else {
			map.once('idle', updateVisibleProject)
		}
	})

	const zoomFullExtent = () => {
		map.flyTo({ ...southeast })
	}

	onDestroy(() => {
		if (map) {
			map.remove()
		}
	})
</script>

<div class="map relative h-full w-full flex-auto" class:has-selected-project={!!selectedProject}>
	<div class="absolute h-full w-full" bind:this={mapContainer}></div>
</div>

<style>
	/* highlight marker on hover; have to use global to prevent unused CSS from being removed */
	:global(
		.mapboxgl-marker:hover svg > path:first-of-type,
		.mapboxgl-marker.visited:hover svg > path:first-of-type
	) {
		fill: orange;
	}

	:global(.mapboxgl-marker.visited svg > path:first-of-type) {
		fill: purple;
	}

	:global(.has-selected-project .mapboxgl-marker) {
		display: none;
	}

	/* make popup contents match regular paragraph styling */
	:global(.mapboxgl-popup-content) {
		font-family: 'Source Sans Pro', sans-serif;
		font-size: 1rem;
		line-height: 1.1;
		padding: 0.5rem;
	}
</style>
