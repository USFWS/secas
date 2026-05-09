<script lang="ts">
	import type { Snippet } from 'svelte'
	import { cn } from '$lib/utils'

	type Props = {
		step: number
		title: string
		img: string
		children: Snippet
		class?: string
	}

	const { step, title, img, children, class: className = '' }: Props = $props()
</script>

<div class={cn('group not-first-of-type:mt-8', className)}>
	<h4>Step {step}: {title}</h4>
	<div class="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-[12rem_1fr]">
		<div>
			<div class="max-w-[16rem]">
				<img src={img} alt={`Step ${step} graphic`} class="rounded-md border border-grey-4 p-1" />
			</div>
		</div>
		<div>
			{@render children()}
		</div>
	</div>
</div>
