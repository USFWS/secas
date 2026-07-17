<script lang="ts">
	import type { Snippet } from 'svelte'
	import { cn } from '$lib/utils'

	type Props = {
		name: string
		title: string
		email: string
		img: string
		children: Snippet
		class?: string
	}

	const { name, title, email, img, children, class: className = '' }: Props = $props()
</script>

<div
	class={cn(
		'not-first-of-type:mt-6 not-first-of-type:border-t border-t-grey-2 not-first-of-type:pt-4 sm:not-first-of-type:border-none sm:not-first-of-type:mt-8',
		className
	)}
>
	<div class="grid grid-cols-1 sm:gap-4 sm:bg-grey-1 sm:px-2 py-1 sm:grid-cols-[10rem_1fr]">
		<div class="text-xl font-bold leading-tight">{name}</div>
		<div class="text-muted-foreground sm:text-foreground sm:text-xl italic leading-tight">
			{title}
		</div>
	</div>
	<div class="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
		<img src={img} alt={name} class="h-auto w-[10rem]" />
		<p>
			{@render children()}
			<br /><br />
			Contact {name.split(' ')[0]} at <a href={`mailto:${email}`}>{email}</a>.
		</p>
	</div>
</div>
