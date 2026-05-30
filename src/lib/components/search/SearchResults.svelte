<script lang="ts">
	import { resolve } from '$app/paths'

	type Result = {
		title: string
		url: string
		author?: string
		date?: string
	}

	type Props = {
		results: Result[]
		onClick: () => void
	}

	const { results, onClick }: Props = $props()
</script>

{#if results.length > 0}
	{#each results as { url, title, author, date } (url)}
		<div class="pt-1.5 not-first:border-t not-first:border-t-grey-2">
			<a href={resolve(url)} onclick={onClick} class="block">{title}</a>
			{#if author && date}
				<div class="text-xs text-muted-foreground">
					by {author} on {date}
				</div>
			{/if}
		</div>
	{/each}
{/if}
