<script lang="ts">
	import WarningIcon from '@lucide/svelte/icons/triangle-alert'
	import { resolve } from '$app/paths'
	import * as Alert from '$lib/components/ui/alert'
	import { List } from '$lib/components/blog'
	import { Breadcrumbs } from '$lib/components/elements'
	import { Head } from '$lib/components/layout'

	const { data } = $props()
</script>

<Head title="Draft blog posts" />

<div class="page-content pb-12">
	<Breadcrumbs
		items={[{ label: 'Blog', url: resolve('/blog/') }, { label: 'Draft posts' }]}
		class="mt-2"
	/>

	<Alert.Root variant="destructive" class="mt-6">
		<Alert.Title class="flex items-center gap-2 text-lg font-bold">
			<WarningIcon class="size-5" />
			Not published!</Alert.Title
		>
		<Alert.Description class="text-lg">
			These blog posts are not currently published.
		</Alert.Description>
	</Alert.Root>

	<h1 class="mt-12 print:mt-0">Draft blog posts</h1>

	{#await data.posts}
		Loading...
	{:then posts}
		<List {posts} class="mt-6" />
	{/await}
</div>
