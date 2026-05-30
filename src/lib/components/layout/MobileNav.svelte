<script lang="ts">
	import MenuIcon from '@lucide/svelte/icons/menu'

	import { resolve } from '$app/paths'
	import { Root, Trigger, Content } from '$lib/components/ui/sheet'
	import { SearchField } from '$lib/components/search'

	import { SITE_NAME } from '$lib/env'

	const { items } = $props()
	let isOpen = $state(false)

	const close = () => {
		isOpen = false
	}
</script>

<Root bind:open={isOpen}>
	<Trigger class="lg:hidden">
		<MenuIcon class="mr-2 text-white" />
	</Trigger>
	<Content side="top" class="max-h-full overflow-auto border-grey-5 px-4 pt-4 pb-8">
		<nav class="mr-8 leading-tight [&_a]:not-first:mt-2">
			<h4 class="leading-tight">{SITE_NAME}</h4>
			<a href={resolve('/')} onclick={close} class="block pl-2 text-lg">Home</a>
			{#each items as item (item.label)}
				{#if item.children?.length}
					<div class="mt-4 mb-4 rounded-md bg-blue-1/50 p-2">
						<div class="text-lg font-semibold">{item.label}</div>
						<div class="pl-4">
							{#each item.children as child (child.url)}
								<a href={resolve(child.url)} onclick={close} class="block text-lg">
									{child.label}
								</a>
							{/each}
						</div>
					</div>
				{:else}
					<a href={resolve(item.url)} onclick={close} class="block pl-2 text-lg">
						{item.label}
					</a>
				{/if}
			{/each}
		</nav>

		<div class="font-bold text-xl -mb-4">Search SECAS blog</div>
		<SearchField onClick={close} />
	</Content>
</Root>
