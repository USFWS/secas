<script lang="ts">
	import { resolve } from '$app/paths'
	import { List } from '$lib/components/blog'
	import { Head, HeaderImage } from '$lib/components/layout'

	import HeroImage from '$images/hero/usfws-wassaw-refuge-boneyard-beach.jpg?format=avif;webp;jpg&w=3200;1920;720&as=picture'
	const caption =
		'<a href="https://www.fws.gov/media/wassaw-refuge-boneyard-beach" target="_blank">Boneyard beach at Wassaw National Wildlife Refuge in Georgia</a>. Photo by Monica Harris/USFWS.'

	const { data } = $props()
</script>

<Head title="Blog" description="Read the SECAS blog." imageURL={HeroImage.img.src} />

<HeaderImage src={HeroImage} {caption} title="Blog" />

<!-- TODO: add RSS link -->

<div class="page-content py-12">
	<p class="text-lg">
		The SECAS blog features articles of interest to the SECAS community, including updates on the
		Blueprint and progress toward the SECAS Goal, related work by other members of the conservation
		community in the Southeast and beyond, and guest post from SECAS partners. Have something you'd
		like to share? Please <a href={resolve('/staff/')}>get in touch</a>!
	</p>
	<h2 class="mt-12">Recent blog posts</h2>
	<List posts={data.posts} class="mt-6 pb-12" />
</div>
