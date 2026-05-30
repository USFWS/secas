<script lang="ts">
	import SearchIcon from '@lucide/svelte/icons/search'
	import { buttonVariants } from '$lib/components/ui/button'
	import * as Sheet from '$lib/components/ui/sheet'
	import { cn } from '$lib/utils'

	import SearchField from './SearchField.svelte'

	let isOpen: boolean = $state(false)

	const handleClick = () => {
		console.log('handleClick')
		isOpen = false
	}
</script>

<Sheet.Root bind:open={isOpen}>
	<Sheet.Trigger
		class={cn(
			buttonVariants({ variant: 'ghost' }),
			'h-auto rounded-full bg-white p-2 text-muted-foreground hover:bg-grey-1 hover:text-foreground'
		)}
	>
		<SearchIcon class="size-5" />
	</Sheet.Trigger>

	<Sheet.Content side="right" class="h-full flex">
		<Sheet.Header class="px-4 pb-0 pt-4">
			<Sheet.Title class="font-bold text-lg">Search SECAS blog</Sheet.Title>
		</Sheet.Header>

		<div class="px-4 flex-auto flex flex-col h-full overflow-hidden">
			<SearchField onClick={handleClick} resultsContainerClass="overflow-auto h-full" />
		</div>
	</Sheet.Content>
</Sheet.Root>
