<script lang="ts">
	import { resolve } from '$app/paths'
	import { Root, List, Item, Trigger, Link, Content } from '$lib/components/ui/navigation-menu'
	import { SearchSidebar } from '$lib/components/search'

	const { items } = $props()
</script>

<div class="hidden items-center gap-4 pr-2 lg:flex xl:gap-8">
	<Root class="flex-none pr-1" viewport={false}>
		<List class="gap-2 xl:gap-6">
			{#each items as item (item.label)}
				<Item>
					{#if item.children?.length}
						<Trigger>{item.label}</Trigger>
						<Content>
							<div class="w-60 text-lg">
								{#each item.children as child (child.url)}
									<div class="py-2 not-first:border-t not-first:border-t-grey-2 hover:bg-grey-0">
										<a href={resolve(child.url)} class="block w-full px-2">{child.label}</a>
									</div>
								{/each}
							</div>
						</Content>
					{:else}
						<Link href={resolve(item.url)}>
							<div>
								{item.label}
							</div>
						</Link>
					{/if}
				</Item>
			{/each}
		</List>
	</Root>

	<SearchSidebar />
</div>
