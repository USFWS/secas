<script lang="ts">
	import { List } from '$lib/components/blog'
	import { Breadcrumbs } from '$lib/components/elements'
	import { Head } from '$lib/components/layout'

	const { params, data } = $props()
</script>

<Head
	title={`Blog posts in ${params.year}`}
	description={`Read SECAS blog posts for ${params.year}.`}
/>

<div class="page-content">
	<Breadcrumbs items={[{ label: 'Blog', url: '/blog' }, { label: params.year }]} class="mt-2" />
	<h1 class="mt-12">Blog posts in {params.year}</h1>
	<List posts={data.posts} class="pt-6 pb-12" />
</div>
