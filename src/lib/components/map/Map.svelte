<script lang="ts">
	import { untrack } from 'svelte'
	import { onMount, onDestroy } from 'svelte'
	import * as mapboxgl from 'mapbox-gl'
	import type { Map as MapboxGLMapType } from 'mapbox-gl'
	import 'mapbox-gl/dist/mapbox-gl.css'

	import { MAPBOX_TOKEN } from '$lib/env'
	import type { Project } from './types'

	import { bounds, style } from './config'
	import { getCenterAndZoom } from './viewport'

	const { projects: rawProjects, selectedProject, onMarkerClick } = $props()

	// intentionally only using the first load of projects
	const projects = untrack(() => rawProjects)

	let mapContainer: HTMLDivElement
	let map: MapboxGLMapType
	let southeast: { center: [number, number]; zoom: number }

	onMount(() => {
		// load initial bounds if project is already selected, to prevent jitter
		southeast = getCenterAndZoom(mapContainer, bounds, 0)

		map = new mapboxgl.Map({
			container: mapContainer,
			accessToken: MAPBOX_TOKEN,
			style: 'mapbox://styles/mapbox/light-v9',
			...southeast
		})

		map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
		map.dragRotate.disable()
		map.touchZoomRotate.disableRotation()

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
			// from @lucide/svelte/icons/home
			span.style =
				'background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhvdXNlLWljb24gbHVjaWRlLWhvdXNlIj48cGF0aCBkPSJNMTUgMjF2LThhMSAxIDAgMCAwLTEtMWgtNGExIDEgMCAwIDAtMSAxdjgiLz48cGF0aCBkPSJNMyAxMGEyIDIgMCAwIDEgLjcwOS0xLjUyOGw3LTZhMiAyIDAgMCAxIDIuNTgyIDBsNyA2QTIgMiAwIDAgMSAyMSAxMHY5YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0yeiIvPjwvc3ZnPg==);'
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
				const marker = new mapboxgl.Marker()
					.setLngLat([longitude, latitude])
					.setPopup(new mapboxgl.Popup({ closeButton: false }).setHTML(title))
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
					bounds: projectBounds,
					boundary: projectBoundary,
					boundary_ids: boundaryIds
				} = selectedProject
				if (projectBounds) {
					map.flyTo({ ...getCenterAndZoom(mapContainer, selectedProject.bounds, 0.05) })
				}

				if (projectBoundary) {
					// @ts-expect-error setData is valid
					map.getSource('geojson').setData({
						type: 'FeatureCollection',
						features: [{ type: 'Feature', geometry: $state.snapshot(projectBoundary) }]
					})
				} else if (boundaryIds) {
					map.setFilter('boundaries-outline', ['in', 'id', ...boundaryIds])
					map.setFilter('boundaries-fill', ['in', 'id', ...boundaryIds])
					// @ts-expect-error setData is valid
					map.getSource('geojson').setData({
						type: 'FeatureCollection',
						features: []
					})
				}
			} else {
				map.setFilter('boundaries-outline', ['==', 'id', Infinity])
				map.setFilter('boundaries-fill', ['==', 'id', Infinity])
				// @ts-expect-error setData is valid
				map.getSource('geojson').setData({
					type: 'FeatureCollection',
					features: []
				})

				map.flyTo({ ...southeast })
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

<div class="map relative h-full w-full" class:has-selected-project={!!selectedProject}>
	<div class="absolute h-full w-full" bind:this={mapContainer}></div>
</div>
