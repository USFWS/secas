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

<div class={cn('not-first-of-type:mt-12', className)}>
	<div class="grid grid-cols-1 gap-4 bg-grey-1 px-2 py-1 sm:grid-cols-[10rem_1fr] sm:gap-4">
		<div class="text-xl font-bold">{name}</div>
		<div class="text-xl italic">{title}</div>
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
