<script lang="ts">
	import { Breadcrumbs } from '$lib/components/elements'
	import { Head } from '$lib/components/layout'

	const { params, data } = $props()

	const { year, month, day } = $derived(params)
	const date = $derived(new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day)))
	const {
		content,
		metadata: { title, author, hero = {} },
		heroImage
	} = $derived(data)
</script>

<Head
	{title}
	// TODO: description derived from snippet of post
	// description="SECAS is a regional conservation initiative that spans the Southeastern United States and Caribbean."
	imageURL={heroImage ? heroImage.img.src : null}
/>

<div class="page-content">
	<Breadcrumbs
		items={[
			{ label: 'Blog', url: '/blog' },
			{ label: params.year, url: `/${params.year}/` },
			{ label: title }
		]}
		class="mt-2"
	/>

	<div class="py-12">
		<h1 class="mb-4 text-2xl md:text-4xl">{title}</h1>
		<p class="pb-4">
			{date.toLocaleDateString()}
			• <i>By {author}</i>
		</p>

		{#if heroImage}
			<figure class="mb-12">
				<enhanced:img src={heroImage} alt={hero.alt || ''} />
				{#if hero.caption}
					<figcaption>{@html hero.caption}</figcaption>
				{/if}
			</figure>
		{/if}

		<div class="markdown-content">
			{@render content()}
		</div>
	</div>
</div>
