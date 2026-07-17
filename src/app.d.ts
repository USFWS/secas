// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	// extend Window object to handle properties / functions added at runtime
	interface Window {
		// gtag and dataLayer are added dynamically at runtime (Google Analytics)
		gtag?: (...unknown) => void
		dataLayer?: unknown[]

		// sentry is dynamically defined at runtime
		Sentry?: {
			captureException: (any) => void
		}

		// map is dynamically added to window on map pages
		map?: Map
	}
}

declare module '*&as=picture' {
	import type { Picture } from 'vite-imagetools'

	const value: Picture
	export default value
}

declare module '*/pocs.csv' {
	import type { POC } from './routes/committees/types'
	const content: POC[]
	export default content
}

declare module '*/steering_committee.csv' {
	import type { SteeringCommitteeMember } from './routes/committees/types'
	const content: SteeringCommitteeMember[]
	export default content
}

declare module '*/workshops.csv' {
	import type { Workshop } from './routes/workshops/types'
	const content: Workshop[]
	export default content
}

export {}
