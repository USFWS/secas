<script lang="ts">
	import { resolve } from '$app/paths'
	import { cn } from '$lib/utils'

	const { posts, class: className = '' } = $props()
</script>

<div class={cn('markdown-content', className)}>
	{#each posts as post (post.path)}
		<div class="grid grid-cols-1 gap-8 not-first:mt-4 md:grid-cols-[300px_1fr]">
			<div>
				{#if post.heroImage}
					<enhanced:img src={post.heroImage} alt="" class="mt-1 border border-grey-4" />
				{/if}
			</div>
			<div>
				<div>
					<a
						href={resolve(`/[year]/[month]/[day]/[slug]`, {
							year: post.metadata.year,
							month: post.metadata.month,
							day: post.metadata.day,
							slug: post.metadata.slug
						})}
						class="text-lg font-bold"
					>
						{post.metadata.title}
					</a>
				</div>

				<div class="mt-2">
					{#if post.metadata.excerpt}
						{@html post.metadata.excerpt}
					{/if}

					<p>
						<a
							href={resolve(`/[year]/[month]/[day]/[slug]`, {
								year: post.metadata.year,
								month: post.metadata.month,
								day: post.metadata.day,
								slug: post.metadata.slug
							})}
						>
							Read more...
						</a>
					</p>
				</div>
			</div>
		</div>
	{:else}
		<div class="h-32 flex items-center justify-center text-muted-foreground">
			No posts available
		</div>
	{/each}
</div>
