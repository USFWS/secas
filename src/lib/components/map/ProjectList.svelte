<script lang="ts">
	const { projects } = $props()
</script>

<nav>
	{#each projects as { id, title, photo, photo_position, photo_caption }, i (id)}
		<a
			href={`#${id}`}
			class="mx-1 mt-1 flex flex-none cursor-pointer flex-col justify-between gap-2 rounded-sm px-4 pt-4 pb-6 no-underline outline-0 not-first:border-t not-first:border-grey-1 hover:bg-blue-1/10 hover:no-underline focus-visible:bg-blue-1/10 focus-visible:ring-2 focus-visible:ring-primary"
		>
			<div class="leading-tight font-bold text-foreground">{title}</div>
			<div
				class="flex h-[120px] flex-col overflow-hidden"
				class:justify-start={photo_position === 'top'}
				class:justify-center={photo_position === 'center' || !photo_position}
				class:justify-end={photo_position === 'bottom'}
			>
				<img
					src={photo}
					alt={photo_caption}
					class="block w-full flex-none border border-grey-4 outline-0"
				/>
			</div>
		</a>
	{/each}
</nav>
