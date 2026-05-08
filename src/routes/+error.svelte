<script>
	import { browser } from '$app/environment'
	import { page } from '$app/state'
	import { CONTACT_EMAIL } from '$lib/env'

	console.error(page.status)
	console.error(page.error)

	if (page.status !== 404 && browser && window.Sentry) {
		window.Sentry.captureException(page.error)
	}
</script>

<svelte:head>
	<title>{page.status} | Southeast Conservation Adaptation Strategy</title>
</svelte:head>

<div class="page-content py-12">
	{#if page.status === 404}
		<h1>PAGE NOT FOUND</h1>
		<p class="mt-8 text-xl">
			Sorry, we could not find what you were looking for here.
			<br /><br />
			If you can't find what you are looking for, please
			<a href={`mailto:${CONTACT_EMAIL}`}>contact us</a>.
		</p>
	{:else}
		<h1>Uh oh!</h1>
		<p class="mt-8 text-xl">
			There was an unexpected error. Please try again in a few minutes.
			<br /><br />
			If that still doesn't work, please
			<a href={`mailto:${CONTACT_EMAIL}`}> let us know</a>!
		</p>
	{/if}
</div>
