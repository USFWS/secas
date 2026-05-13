/**
 * Sort posts by descending date and ascending slug
 */
export const sortPosts = (pathA: string, pathB: string) => {
	const partsA = pathA.split('/')
	const partsB = pathB.split('/')
	const dateA = partsA.slice(-5, -2).join('-')
	const dateB = partsB.slice(-5, -2).join('-')

	if (dateA === dateB) {
		return (partsA.at(-2) || 0) < (partsB.at(-2) || 0) ? -1 : 1
	}
	return dateA > dateB ? -1 : 1
}
