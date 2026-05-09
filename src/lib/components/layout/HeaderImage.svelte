<script lang="ts">
	import { cn } from '$lib/utils'
	import { tv } from 'tailwind-variants'

	const variants = tv({
		base: 'relative w-full overflow-hidden z-0 max-h border-b-2 border-grey-8 [&>div]:page-content [&>div]:relative [&>div]:z-2 [&>div]:px-4 [&>div]:py-8 [&>div]:mt-6',
		variants: {
			variant: {
				// FIXME: responsive
				default: 'h-54 ',
				tall: 'h-80 sm:h-120'
			}
		}
	})

	type Props = {
		src: string
		variant?: keyof typeof variants.variants.variant
		class?: string
		title?: string
		caption?: string
		imageClass?: string
	}

	const {
		src,
		variant = 'default',
		class: className = '',
		imageClass = '',
		title,
		caption
	}: Props = $props()
</script>

<div class={cn('header-image', variants({ variant }), className)}>
	<enhanced:img
		{src}
		alt=""
		class={cn('absolute top-0 left-0 z-1 h-full w-full object-cover', imageClass)}
	/>
	{#if title}
		<div class="page-content">
			<h1 class="text-5xl font-bold md:text-5xl lg:text-6xl">{title}</h1>
		</div>
	{/if}
</div>
{#if caption}
	<div class="px-2 text-sm leading-tight text-muted-foreground md:text-right">
		{@html caption}
	</div>
{/if}
