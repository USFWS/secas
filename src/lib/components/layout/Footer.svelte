<script lang="ts">
	import { browser } from '$app/environment'
	import { resolve } from '$app/paths'
	import { page } from '$app/state'

	import SubscribeFooter from './SubscribeFooter.svelte'

	// TODO: also exclude from projects-map page
	const showSubscribeFooter = $derived(browser && page.url.pathname.indexOf('/subscribe') === -1)
</script>

{#if !page.error}
	<div class="page-content my-4">
		{#if showSubscribeFooter}
			<SubscribeFooter />
		{/if}

		<div class="text-center">
			<a href={resolve('/staff/')}>Contact us</a>
		</div>
	</div>
{/if}
