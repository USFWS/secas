<script lang="ts">
	import { onMount } from 'svelte'
	import Fuse from 'fuse.js'
	import SearchIcon from '@lucide/svelte/icons/search'
	import ResetIcon from '@lucide/svelte/icons/circle-x'

	import * as InputGroup from '$lib/components/ui/input-group'
	import { cn } from '$lib/utils'
	import { Button } from '$lib/components/ui/button'

	import SearchResults from './SearchResults.svelte'
	import { loadIndex } from './searchIndex'
	import type { SearchItem } from './searchIndex'

	const { onClick, resultsContainerClass = '' } = $props()
	let query: string = $state('')
	let results: SearchItem[] = $state([])
	let index: Fuse<SearchItem> | null = null
	let inputRef = $state<HTMLInputElement | null>(null)

	onMount(async () => {
		index = await loadIndex()
	})

	$effect(() => {
		/* eslint-disable @typescript-eslint/no-unused-expressions */
		index
		query
		/* eslint-enable @typescript-eslint/no-unused-expressions */

		if (index !== null && query !== '') {
			const matches = index.search(query)
			results = matches.map(({ item }) => item)
		} else {
			results = []
		}
	})

	const reset = () => {
		query = ''
		results = []

		if (inputRef) {
			inputRef.focus()
		}
	}
</script>

<InputGroup.Root class="flex-none mt-1 mb-2">
	<InputGroup.Addon align="inline-start">
		<SearchIcon />
	</InputGroup.Addon>
	<InputGroup.Input bind:ref={inputRef} autofocus placeholder="Search..." bind:value={query} />
	<InputGroup.Addon align="inline-end">
		<Button
			variant="ghost"
			onclick={reset}
			class={cn('rounded-full h-auto p-0!', {
				hidden: query === ''
			})}
		>
			<ResetIcon class="size-5 text-muted-foreground/50 hover:text-muted-foreground" />
		</Button>
	</InputGroup.Addon>
</InputGroup.Root>

<div class={cn('space-y-1.5 px-1 text-base flex-auto pb-4', resultsContainerClass)}>
	<SearchResults {results} {onClick} />
</div>
