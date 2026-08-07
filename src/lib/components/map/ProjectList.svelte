<script lang="ts">
	import { cn } from '$lib/utils'

	const { projects } = $props()
</script>

<nav>
	{#each projects as { id, title, photo, hero = { } } (id)}
		<a
			href={`#${id}`}
			class="mx-1 mt-1 flex flex-none cursor-pointer flex-col justify-between gap-2 rounded-sm px-4 pt-4 pb-6 no-underline outline-0 not-first:border-t not-first:border-grey-1 hover:bg-blue-1/10 hover:no-underline focus-visible:bg-blue-1/10 focus-visible:ring-2 focus-visible:ring-primary"
		>
			<div class="leading-tight font-bold text-foreground">{title}</div>
			<div
				class={cn('flex h-[120px] flex-col overflow-hidden', {
					'justify-start': hero.position === 'top',
					'justify-center': hero.position === 'center' || !hero.position,
					'justify-end': hero.position === 'bottom'
				})}
			>
				<img
					src={photo}
					alt={hero.alt || ''}
					class="block w-full flex-none border border-grey-4 outline-0"
				/>
			</div>
		</a>
	{/each}
</nav>
