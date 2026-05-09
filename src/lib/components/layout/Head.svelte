<script lang="ts">
	import { browser } from '$app/environment'

	import { SITE_NAME } from '$lib/env'

	type Props = {
		title?: string
		description?: string
		imageURL?: string
	}

	const { title, description, imageURL }: Props = $props()

	const url = $derived(browser ? window.location.href : null)
	// const imageURL = $derived(browser && imagePath ? `${window.location.origin}${imagePath}` : null)
</script>

<svelte:head>
	<title>
		{title ? `${title} | ${SITE_NAME}` : SITE_NAME}
	</title>

	<meta property="og:title" content={title || SITE_NAME} />
	<meta property="og:url" content={url} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE_NAME} />

	{#if description}
		<meta name="description" content={description} />
		<meta property="og:description" content={description} />
	{/if}

	{#if imageURL}
		<meta property="og:image" content={imageURL} />
	{/if}
</svelte:head>
