import { resolve } from '$app/paths'

/**
 * Sort posts by descending date and ascending slug
 */
export const sortPosts = (pathA: string, pathB: string) => {
	const filenameA = pathA.split('/').slice(-1)[0]
	const dateA = filenameA.slice(0, 10)
	const nameA = filenameA.slice(11)

	const filenameB = pathB.split('/').slice(-1)[0]
	const dateB = filenameB.slice(0, 10)
	const nameB = filenameB.slice(11)

	if (dateA === dateB) {
		return nameA < nameB ? -1 : 1
	}
	return dateA > dateB ? -1 : 1
}

const dateRegex = /(?<year>\d\d\d\d)-(?<month>\d\d)-(?<day>\d\d)/

export const extractDate = (path: string) => {
	const { year = '0', month = '0', day = '0' } = dateRegex.exec(path)?.groups || {}
	return { year, month, day }
}

export const extractBlogParams = (path: string, published = true) => {
	const { year, month, day } = extractDate(path)
	const slug = path.split('/').slice(-1)[0].slice(11, -3)
	const url = published
		? resolve(`/${year}/${month}/${day}/${slug}`)
		: resolve(`/blog/draft/${year}-${month}-${day}-${slug}`)

	return {
		year,
		month,
		day,
		slug,
		url
	}
}
