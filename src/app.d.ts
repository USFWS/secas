declare global {
	namespace App {}

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
	const value: import('vite-imagetools').Picture
	export default value
}

declare module '*/pocs.csv' {
	const content: import('./routes/committees/types').POC[]
	export default content
}

declare module '*/steering_committee.csv' {
	const content: import('./routes/committees/types').SteeringCommitteeMember[]
	export default content
}

declare module '*/workshops.csv' {
	const content: import('./routes/workshops/types').Workshop[]
	export default content
}
