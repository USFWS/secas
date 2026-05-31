<script lang="ts">
	import { browser } from '$app/environment'
	import { resolve } from '$app/paths'
	import { Breadcrumbs } from '$lib/components/elements'
	import { Head } from '$lib/components/layout'

	const { params, data } = $props()

	const { year, month, day } = $derived(params)
	const date = $derived(new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day)))
	const {
		content,
		metadata: { title, author, hero = {}, excerpt },
		heroImage
	} = $derived(data)

	const url = browser ? window.location.href : null
</script>

<Head {title} description={excerpt} imageURL={heroImage ? heroImage.img.src : null} />

<div class="page-content">
	{#if url}
		<div class="text-muted-foreground text-sm hidden print:block mb-4">
			{url}
		</div>
	{/if}

	<Breadcrumbs
		items={[
			{ label: 'Blog', url: resolve('/blog/') },
			{ label: params.year, url: resolve(`/${params.year}/`) },
			{ label: title }
		]}
		class="mt-2"
	/>

	<div class="py-12 print:pt-0">
		<h1 class="text-2xl md:text-4xl">
			{title}
		</h1>

		<p class="pt-2 pb-4 italic text-muted-foreground">
			{date.toLocaleDateString()}
			by {author}
		</p>

		{#if heroImage}
			<figure class="mb-12 flex flex-col items-center">
				<enhanced:img src={heroImage} alt={hero.alt || ''} />
				{#if hero.caption}
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<figcaption>{@html hero.caption}</figcaption>
				{/if}
			</figure>
		{/if}

		<div class="markdown-content">
			{@render content()}
		</div>
	</div>
</div>
