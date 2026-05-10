<script lang="ts">
	import { browser } from '$app/environment'
	import { resolve } from '$app/paths'
	import { page } from '$app/state'

	import SubscribeFooter from './SubscribeFooter.svelte'

	// NOTE: we do not show the footer below the subscribe or story-map pages
	const excludePaths = ['/subscribe', '/story-map']
	const isVisible = $derived(
		browser && !excludePaths.some((path) => page.url.pathname.indexOf(path) !== -1)
	)
</script>

{#if !page.error && isVisible}
	<div class="page-content my-4">
		<SubscribeFooter />

		<div class="text-center">
			<a href={resolve('/staff/')}>Contact us</a>
		</div>
	</div>
{/if}
