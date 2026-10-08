import { defineParams } from '@sveltejs/kit/params'

export const params = defineParams({
	int(value) {
		return /^\d+$/.test(value) ? value : undefined
	}
})
