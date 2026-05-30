<script lang="ts">
	import RSSIcon from '@lucide/svelte/icons/rss'
	import { resolve } from '$app/paths'
	import { List } from '$lib/components/blog'
	import { Button } from '$lib/components/ui/button'
	import { Pagination } from '$lib/components/elements'
	import { Head, HeaderImage } from '$lib/components/layout'

	import HeroImage from '$images/hero/usfws-wassaw-refuge-boneyard-beach.jpg?format=avif;webp;jpg&w=3200;1920;720&as=picture'
	const caption =
		'<a href="https://www.fws.gov/media/wassaw-refuge-boneyard-beach" target="_blank">Boneyard beach at Wassaw National Wildlife Refuge in Georgia</a>. Photo by Monica Harris/USFWS.'

	const { data } = $props()
</script>

<Head title="Blog" description="Read the SECAS blog." imageURL={HeroImage.img.src} />

<HeaderImage src={HeroImage} {caption} title="Blog" />

<div class="page-content py-12">
	<p class="text-lg">
		The SECAS blog features articles of interest to the SECAS community, including updates on the
		Blueprint and progress toward the SECAS Goal, related work by other members of the conservation
		community in the Southeast and beyond, and guest post from SECAS partners. Have something you'd
		like to share? Please <a href={resolve('/staff/')}>get in touch</a>!
	</p>

	<div class="mt-8">
		<div class="text-xl font-bold">Jump to posts by year:</div>
		<div class="flex flex-wrap items-center gap-2 bg-grey-1/50 py-2 px-4 rounded-md mt-2">
			{#each Object.keys(data.postsByYear).sort((a, b) => (a < b ? 1 : -1)) as year (year)}
				<div class="flex-none w-32">
					<a href={resolve(`/${year}/`)}> {year}</a>
					<span class="text-sm text-muted-foreground"> ({data.postsByYear[year]} posts)</span>
				</div>
			{/each}
		</div>
	</div>

	<div class="mt-16 flex gap-4 justify-between items-baseline">
		<h2>Recent blog posts</h2>
		<Button
			href={resolve('/feed.xml')}
			target="_blank"
			variant="secondary"
			class="no-underline"
			size="sm"><RSSIcon /> Subscribe to RSS feed</Button
		>
	</div>

	{#await data.posts}
		Loading...
	{:then posts}
		<List {posts} class="mt-6" />
		<Pagination pages={data.pages} currentPage={1} class="mt-6" />
	{/await}
</div>
