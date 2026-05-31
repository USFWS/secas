<script lang="ts">
	import { resolve } from '$app/paths'
	import { List } from '$lib/components/blog'
	import { Breadcrumbs } from '$lib/components/elements'
	import { Head } from '$lib/components/layout'

	const { params, data } = $props()
</script>

<Head
	title={`Blog posts in ${params.year}`}
	description={`Read SECAS blog posts for ${params.year}.`}
/>

<div class="page-content pb-12">
	<Breadcrumbs
		items={[{ label: 'Blog', url: resolve('/blog/') }, { label: params.year }]}
		class="mt-2"
	/>
	<h1 class="mt-12 print:mt-0">Blog posts in {params.year}</h1>

	{#await data.posts}
		Loading...
	{:then posts}
		<List {posts} class="mt-6" />
	{/await}
</div>
