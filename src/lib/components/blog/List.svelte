<script lang="ts">
	import { cn } from '$lib/utils'

	const { posts, class: className = '' } = $props()
</script>

<div class={cn('markdown-content blog-list', className)}>
	{#each posts as post (post.path)}
		<div
			class="not-first grid grid-cols-1 gap-8 not-first:mt-8 not-first:border-t not-first:border-t-grey-2 not-first:pt-12 md:grid-cols-[400px_1fr]"
		>
			<div>
				{#if post.heroImage}
					<a href={post.metadata.url} aria-label={`go to ${post.metadata.title} post`}>
						<enhanced:img src={post.heroImage} alt="" class="mt-1 border border-grey-4" />
					</a>
				{/if}
			</div>
			<div>
				<div>
					<a href={post.metadata.url} class="text-lg font-bold">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html post.metadata.title}
					</a>
				</div>

				<p class="mt-1 text-sm">
					{new Date(
						parseInt(post.metadata.year, 10),
						parseInt(post.metadata.month, 10) - 1,
						parseInt(post.metadata.day)
					).toLocaleDateString()}
					&nbsp;&nbsp;•&nbsp;&nbsp;<i>{post.metadata.author}</i>
				</p>

				<div class="mt-2">
					{#if post.metadata.excerpt}
						<div class="mb-4">
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html post.metadata.excerpt}
						</div>
					{/if}

					<p>
						<a href={post.metadata.url}>Read more... </a>
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
