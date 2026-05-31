<script lang="ts">
	import { onMount } from 'svelte'
	import sourceSansPro from '@fontsource/source-sans-pro/files/source-sans-pro-latin-400-normal.woff2?url'
	import sourceSansProSemiBold from '@fontsource/source-sans-pro/files/source-sans-pro-latin-600-normal.woff2?url'
	import sourceSansProBold from '@fontsource/source-sans-pro/files/source-sans-pro-latin-700-normal.woff2?url'
	import ralewayBold from '@fontsource/raleway/files/raleway-latin-700-normal.woff2?url'

	import { browser } from '$app/environment'
	import { afterNavigate } from '$app/navigation'
	import { GOOGLE_ANALYTICS_ID, SITE_NAME, SITE_URL } from '$lib/env'
	import { Footer, Header } from '$lib/components/layout'

	import '../app.css'

	let { children } = $props()

	// reset scroll of content node on navigate
	let contentNode: Element | null = $state(null)
	afterNavigate(() => {
		if (contentNode) {
			contentNode.scrollTop = 0
		}
	})

	onMount(() => {
		// set site name for print views (note the nested quotes required for CSS)
		document.documentElement.style.setProperty(
			'--print-footer',
			`"${SITE_NAME} (${SITE_URL}) - ${new Date().toLocaleDateString()}"`
		)
	})

	const handleGTAGLoad = () => {
		if (!window.dataLayer) {
			console.warn('GTAG not properly initialized')
			return
		}

		console.debug('setting up GTAG')

		function gtag() {
			// @ts-expect-error dataLayer is valid; ignore warning
			dataLayer.push(arguments)
		}

		// @ts-expect-error gtag is valid; ignore warning
		gtag('js', new Date())
		// @ts-expect-error gtag is valid; ignore warning
		gtag('config', GOOGLE_ANALYTICS_ID)
		window.gtag = gtag
	}
</script>

<svelte:head>
	<link rel="preload" as="font" type="font/woff2" href={sourceSansPro} crossorigin="anonymous" />
	<link
		rel="preload"
		as="font"
		type="font/woff2"
		href={sourceSansProBold}
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		as="font"
		type="font/woff2"
		href={sourceSansProSemiBold}
		crossorigin="anonymous"
	/>
	<link rel="preload" as="font" type="font/woff2" href={ralewayBold} crossorigin="anonymous" />
	{#if browser && GOOGLE_ANALYTICS_ID}
		<script
			async
			src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
			onload={handleGTAGLoad}
		></script>
	{/if}
</svelte:head>

<div class="overflow-none flex h-full w-full flex-col">
	<Header />
	<main bind:this={contentNode} class="h-full w-full flex-auto overflow-auto print:h-auto">
		{@render children()}
		<Footer />
	</main>
</div>
