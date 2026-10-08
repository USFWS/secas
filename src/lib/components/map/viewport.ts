import { viewport } from '@placemarkio/geo-viewport'

/**
 * Calculate the appropriate center and zoom to fit the bounds, given padding.
 * @param {Element} - map DOM node used to calculate height and width in screen pixels of map
 * @param {Array(number)} bounds - [xmin, ymin, xmax, ymax]
 * @param {float} padding - proportion of calculated zoom level to zoom out by, to pad the bounds
 */
export const getCenterAndZoom = (
	mapNode: HTMLDivElement,
	bounds: [number, number, number, number],
	padding: number = 0
) => {
	const { offsetWidth: width, offsetHeight: height } = mapNode
	const calcViewport = viewport(bounds, [width, height])

	// Zoom out slightly to pad around bounds
	const zoom = Math.max(calcViewport.zoom - 1, 0) * (1 - padding)

	return { center: calcViewport.center, zoom }
}
