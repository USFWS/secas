<script lang="ts">
	import { resolve } from '$app/paths'
	import { List } from '$lib/components/blog'
	import { Head, HeaderImage } from '$lib/components/layout'

	import HeroImage from '$images/hero/cherokee-prairie.jpg?format=avif;webp;jpg&w=3200;1920;720&as=picture'
	const caption =
		'Cherokee Prairie Natural Area, Arkansas River Valley. <a href="https://www.segrasslands.org/arkansas-valley-grasslands">Photo</a> by William Dark Photography, used by permission of <a href="https://www.segrasslands.org/">Southeastern Grasslands Institute</a>.'

	import SECAS_Logo from '$images/SECAS_logo.svg?url'

	const { data } = $props()
</script>

<Head
	description="The Southeast Conservation Adaptation Strategy brings together public and private organizations around a bold vision for the future of our region."
	imageURL={SECAS_Logo}
/>

<HeaderImage
	variant="tall"
	src={HeroImage}
	{caption}
	title="Southeast Conservation Adaptation Strategy"
/>

<div class="page-content py-12">
	<p class="text-lg">
		The <b>Southeast Conservation Adaptation Strategy</b> (SECAS) brings together public and private organizations
		around a bold vision for the future of our region. We're connecting the lands and waters of the Southeast
		and Caribbean to support healthy ecosystems, thriving fish and wildlife populations, and vibrant communities.
		With a data-driven spatial plan and an ambitious regional goal, SECAS helps accelerate conservation
		action in the places where it will make the biggest impact.
	</p>
	<div class="mt-5 grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr] [&_li]:not-first:mt-4">
		<ul class=" text-lg leading-snug">
			<li>
				<b>A bold vision:</b> A connected network of lands and waters that supports thriving fish and
				wildlife populations and improved quality of life for people.
			</li>
			<li>
				<b>An ambitious goal:</b> A 10% or greater improvement in the health, function, and
				connectivity of Southeastern ecosystems by 2060.
				<a href={resolve('/our-goal/')}>Learn more</a>.
			</li>
			<li>
				<b>A Blueprint for action:</b> A data-driven spatial plan that's helping more than 500
				people from over 200 organizations bring in new funding and inform their conservation
				decisions. <a href={resolve('/blueprint/')}>Learn more</a>.
			</li>
		</ul>

		<figure class="mt-2 max-w-150">
			<enhanced:img
				src="$images/SECAS_Geography_Map_2025.png"
				alt="Map of the SECAS geography outlining 15 states of the Southeast, Puerto Rico, U.S. Virgin Islands, and the offshore marine environment in green"
				class="border border-grey-4"
			/>
			<figcaption>The SECAS geography.</figcaption>
		</figure>
	</div>

	<!-- Hilary: enable workshop block here -->
	<hr />
	<h3>Participate in a Blueprint workshop!</h3>
	<p>
		Your input helps to ensure the Blueprint represents on-the-ground conditions and captures your
		conservation priorities, and also helps staff prioritize future improvements.
		<br /><br />

		<a href={resolve('/workshops/', {})}>Register for a workshop</a>.
	</p>

	<hr />

	<div class="mt-12">
		<h3>From the blog</h3>
		<List posts={data.posts} class="mt-2" />

		<div class="mt-12">
			Read more posts on the <a href={resolve('/blog/')}>Blog</a> page.
		</div>
	</div>
</div>
