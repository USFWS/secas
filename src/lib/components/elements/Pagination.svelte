<script lang="ts">
	import ChevronLeft from '@lucide/svelte/icons/chevron-left'
	import ChevronRight from '@lucide/svelte/icons/chevron-right'
	import Ellipsis from '@lucide/svelte/icons/ellipsis'
	import { Button } from '$lib/components/ui/button'
	import { cn } from '$lib/utils'

	type Page = {
		value: number
		type?: 'ellipsis'
		url?: string
	}

	type Props = {
		pages: Page[]
		currentPage: number
		class?: string
	}

	const { pages, currentPage, class: className = '' }: Props = $props()

	// always show first and last 2 pages, current page, and 1 page on either side of current page
	const showPages = $derived(
		new Set([1, 2, currentPage - 1, currentPage, currentPage + 1, pages.length - 1, pages.length])
	)

	const displayPages = $derived.by(() => {
		const out = []
		pages.forEach((page, i) => {
			if (showPages.has(i + 1)) {
				out.push({
					key: i + 1,
					label: i + 1,
					isActive: currentPage === i + 1,
					...page
				})
			} else if (out.length > 1 && out[out.length - 1].type !== 'ellipsis') {
				out.push({
					key: i + 1,
					type: 'ellipsis'
				})
			}
		})
		return out
	})
</script>

<div class={cn('flex flex-wrap items-center justify-center gap-2 sm:flex-nowrap', className)}>
	<Button
		href={currentPage > 1 ? pages[currentPage - 2].url : null}
		disabled={currentPage === 1}
		variant="ghost"
		class="flex-none no-underline hover:bg-blue-1/50"
	>
		<ChevronLeft />
		Previous
	</Button>
	{#each displayPages as page (page.key)}
		{#if page.isActive}
			<div class="flex-none rounded-sm border border-blue-8/50 px-2 py-1 font-bold">
				{page.label}
			</div>
		{:else if page.type === 'ellipsis'}
			<Ellipsis class="hidden size-8 flex-none px-2 py-1 text-grey-8 sm:block" />
		{:else}
			<Button
				href={page.url}
				variant="ghost"
				class={cn('hidden flex-none no-underline hover:bg-blue-1/50 sm:flex', {
					flex: page.key === 1 || page.key === pages.length
				})}
			>
				{page.label}
			</Button>
		{/if}
	{/each}

	<Button
		href={currentPage < pages.length ? pages[currentPage].url : null}
		disabled={currentPage === pages.length}
		variant="ghost"
		class="flex-none no-underline hover:bg-blue-1/50"
	>
		Next
		<ChevronRight />
	</Button>
</div>
