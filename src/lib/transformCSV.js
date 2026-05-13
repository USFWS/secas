import { parse } from 'csv-parse/sync'

export const transformCSV = {
	name: 'transform-csv',
	// @ts-expect-error cannot mark types here
	transform(code, id) {
		if (id.endsWith('.csv')) {
			const parsed = parse(code, { columns: true, skip_empty_lines: true })
			return {
				code: `export default ${JSON.stringify(parsed)}`,
				map: null
			}
		}
	}
}
