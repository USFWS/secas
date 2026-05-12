<script lang="ts">
	import { Head, HeaderImage } from '$lib/components/layout'

	const { data } = $props()
	const { page, title, description, banner, banner_caption: caption } = $derived(data)

	console.log('caption', caption)
</script>

<Head {title} {description} imageURL={banner.img.src} />

<HeaderImage src={banner} {caption} {title} />

<div class="page-content markdown-content py-12">
	{@render page()}
</div>
