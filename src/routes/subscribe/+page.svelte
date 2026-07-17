<script lang="ts">
	import { onMount } from 'svelte'

	let isLoaded = $state(false)

	onMount(() => {
		isLoaded = true
	})
</script>

<div>
	<!-- Microsoft 365 signup form: defer loading until rest of page has loaded -->
	<div class="h-[900px]">
		{#if isLoaded}
			<iframe
				title="Subscribe to SECAS Newsletter"
				width="100%"
				height="900px"
				src="https://forms.office.com/Pages/ResponsePage.aspx?id=urWTBhhLe02TQfMvQApUlLEoUnbQ0DhEgS5Ry7V4GfFUQTYxQThYTjhHUjdKWE9JQUpWOFcyV0FMVC4u&embed=true"
				frameborder="0"
				marginwidth="0"
				marginheight="0"
				style="border: none; max-width:100%; height:900px;"
				allowfullscreen
				mozallowfullscreen
				msallowfullscreen
			>
			</iframe>
		{/if}
	</div>
</div>
