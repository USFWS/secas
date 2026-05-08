<script lang="ts">
	import type { Snippet } from 'svelte'
	import { cn } from '$lib/utils'
	import { tv } from 'tailwind-variants'

	const variants = tv({
		base: 'relative w-full overflow-hidden z-0 max-h border-b-2 border-grey-8',
		variants: {
			variant: {
				// FIXME: responsive
				default: 'h-54',
				tall: 'h-80 sm:h-120'
			}
		}
	})

	type Props = {
		src: string
		variant?: keyof typeof variants.variants.variant
		class?: string
		children?: Snippet
		caption?: string
		imageClass?: string
	}

	const {
		src,
		variant = 'default',
		class: className = '',
		imageClass = '',
		children,
		caption
	}: Props = $props()
</script>

<div class={cn(variants({ variant }), className)}>
	<!-- FIXME: enhanced image instead -->
	<!-- <enhanced:img {src} alt="" class="absolute top-0 left-0 z-1 h-full w-full object-cover" /> -->
	<img
		{src}
		alt=""
		class={cn('absolute top-0 left-0 z-1 h-full w-full object-cover', imageClass)}
	/>
	{#if children}
		<div class="relative z-2">
			{@render children()}
		</div>
	{/if}
</div>
{#if caption}
	<div class="px-2 text-sm leading-tight text-muted-foreground md:text-right">
		{@html caption}
	</div>
{/if}
