/**
 * Convert an array to an object, indexing on values of field
 */
export const indexBy = (records: object[], field: string) =>
	records.reduce(
		(prev, record) => Object.assign(prev, { [record[field as keyof typeof record]]: record }),
		{}
	)
