<script lang="ts" module>
	export type Item = {
		label: string
		url?: string
	}
</script>

<script lang="ts">
	import ChevronsRight from '@lucide/svelte/icons/chevrons-right'
	import { cn } from '$lib/utils'

	const { items, class: className = '' }: { items: Item[]; class?: string } = $props()
</script>

<div class={cn('flex items-center gap-1 text-sm', className)}>
	{#each items as { label, url }, i (url)}
		{#if i > 0}
			<ChevronsRight class="size-4 text-muted-foreground/75" />
		{/if}

		{#if url}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve (all must be resolved prior)-->
			<a href={url}>{label}</a>
		{:else}
			<span class="truncate">{label}</span>
		{/if}
	{/each}
</div>
