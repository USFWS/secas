<script lang="ts">
	import SearchIcon from '@lucide/svelte/icons/search'
	import { resolve } from '$app/paths'
	import { Button } from '$lib/components/ui/button'

	import { Root, List, Item, Trigger, Link, Content } from '$lib/components/ui/navigation-menu'

	const { items } = $props()
</script>

<div class="flex items-center gap-4 pr-2 xl:gap-8">
	<Root class="hidden flex-none pr-1 lg:block " viewport={false}>
		<List class="gap-2 xl:gap-6">
			{#each items as item (item.label)}
				<Item>
					{#if item.children?.length}
						<Trigger>{item.label}</Trigger>
						<Content>
							<div class="w-48 text-lg">
								{#each item.children as child (child.url)}
									<div class="py-2 not-first:border-t not-first:border-t-grey-2 hover:bg-grey-0">
										<a href={resolve(child.url)} class="block w-full px-2">{child.label}</a>
									</div>
								{/each}
							</div>
						</Content>
					{:else}
						<Link href={resolve(item.url)}>
							<!-- <div>
						<item.icon class="size-6 text-white" />
					</div> -->
							<div>
								{item.label}
							</div>
						</Link>
					{/if}
				</Item>
			{/each}
		</List>
	</Root>

	<Button
		variant="ghost"
		class="h-auto rounded-full bg-white p-2 text-muted-foreground hover:bg-grey-1 hover:text-foreground"
	>
		<SearchIcon class="size-5" />
	</Button>
</div>
