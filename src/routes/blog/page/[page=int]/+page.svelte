<script lang="ts">
	import { resolve } from '$app/paths'
	import { List } from '$lib/components/blog'
	import { Head } from '$lib/components/layout'
	import { Breadcrumbs, Pagination } from '$lib/components/elements'

	const { params, data } = $props()

	const pageNum = $derived(parseInt(params.page, 10))
</script>

<Head
	title={`Blog - Page ${params.page}`}
	description={`Read the SECAS blog - page ${params.page}.`}
/>

<div class="page-content pb-12">
	<Breadcrumbs
		items={[{ label: 'Blog', url: resolve('/blog/') }, { label: `Page ${params.page}` }]}
		class="mt-2"
	/>
	<h2 class="mt-12">Blog posts - page {params.page}</h2>
	{#await data.posts}
		Loading...
	{:then posts}
		<List {posts} class="mt-6" />
		<Pagination pages={data.pages} currentPage={pageNum} class="mt-6" />
	{/await}
</div>
