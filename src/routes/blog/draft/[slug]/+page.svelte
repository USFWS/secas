<script lang="ts">
	import WarningIcon from '@lucide/svelte/icons/triangle-alert'
	import { browser } from '$app/environment'
	import { resolve } from '$app/paths'
	import * as Alert from '$lib/components/ui/alert'
	import { Breadcrumbs } from '$lib/components/elements'
	import { Head } from '$lib/components/layout'

	const { data } = $props()

	const { year, month, day } = $derived(data.metadata)
	const date = $derived(new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day)))
	const {
		content,
		metadata: { title, author, hero = {}, excerpt },
		heroImage
	} = $derived(data)

	const url = browser ? window.location.href : null
</script>

<Head {title} description={excerpt} imageURL={heroImage ? heroImage.img.src : null} />

<!-- We hide it completely from printing -->
<div class="page-content print:hidden">
	{#if url}
		<div class="text-muted-foreground text-sm hidden print:block mb-4">
			{url}
		</div>
	{/if}

	<Breadcrumbs
		items={[
			{ label: 'Blog', url: resolve('/blog/') },
			{ label: 'Draft posts', url: resolve(`/blog/draft/`) },
			{ label: title }
		]}
		class="mt-2"
	/>

	<Alert.Root variant="destructive" class="mt-6">
		<Alert.Title class="flex items-center gap-2 text-lg font-bold">
			<WarningIcon class="size-5" />
			Not published!</Alert.Title
		>
		<Alert.Description class="text-lg">
			This blog post is not currently published. Please do not link to it.
		</Alert.Description>
	</Alert.Root>

	<div class="pt-6 pb-12 print:pt-0">
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
