/**
 * Convert an array to an object, indexing on values of field
 */
export const indexBy = (records: object[], field: string) =>
	records.reduce(
		(prev, record) => Object.assign(prev, { [record[field as keyof typeof record]]: record }),
		{}
	)

export const groupBy = (data: object[], field: string) =>
	data.reduce((prev: Record<string, Array<object>>, d) => {
		const key = d[field as keyof typeof d]
		prev[key] = (prev[key] || []).concat([d])
		return prev
	}, {})
