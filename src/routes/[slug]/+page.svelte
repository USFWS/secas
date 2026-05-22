<script lang="ts">
	import { Head, HeaderImage } from '$lib/components/layout'

	const { data } = $props()
	const { page, title, description, heroImage, alt, caption } = $derived(data)
</script>

<Head {title} {description} imageURL={heroImage.img.src} />

{#if heroImage}
	<HeaderImage src={heroImage} {caption} {title} {alt} />
{/if}

<div class="page-content markdown-content py-12">
	{@render page()}
</div>
