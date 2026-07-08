<script lang="ts">
	import type { Component } from 'svelte'
	import { CircleX } from '@lucide/svelte'
	import { Button } from '$lib/components/ui/button'

	type Props = {
		title: string
		content: Component
		photo: string
		photo_caption: string
		photo_url?: string | null | undefined
		onClose: () => void
	}

	const { title, content, photo, photo_caption, photo_url, onClose }: Props = $props()
</script>

<div class="relative flex flex-col markdown-content story-map-content">
	<div class="px-4 pt-4 sm:pb-8">
		<div class="justify-between gap-4 hidden sm:flex mb-4">
			<div class="flex-auto text-xl leading-tight font-bold">
				{title}
			</div>
			<div class="flex-none">
				<Button
					variant="ghost"
					size="lg"
					onclick={onClose}
					class="mt-1 h-auto rounded-full p-0 text-muted-foreground/75 hover:text-foreground"
					title="close project"
				>
					<CircleX class="size-6" />
				</Button>
			</div>
		</div>

		<figure>
			<img src={photo} alt="caption" class="border border-grey-4" />
			<figcaption>
				{#if photo_url && photo_caption.indexOf('Photo:') !== -1}
					{photo_caption.split('Photo:')[0]}Photo:
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a href={photo_url} target="_blank" class="text-zinc-600 underline"
						>{photo_caption.split('Photo:')[1]}</a
					>
				{:else}
					{photo_caption}
				{/if}
			</figcaption>
		</figure>

		<div class="mt-6 leading-snug [&_p]:mt-4">{@render content()}</div>
	</div>
</div>
