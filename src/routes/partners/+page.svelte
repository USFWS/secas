<script lang="ts">
	import { Head, HeaderImage } from '$lib/components/layout'

	import HeroImage from '$images/hero/SouthAtlanticBlueprint2_2_workshop.jpg?format=avif;jpg&w=3200;1600;800&as=picture'
	const caption = 'South Atlantic Blueprint workshop'
</script>

<Head
	title="Partners"
	description="Learn more about the groups and organizations participating in the Southeast Conservation Adaptation Strategy (SECAS)."
	imageURL={HeroImage.img.src}
/>

<HeaderImage src={HeroImage} {caption} title="SECAS Partners" />

<div class="page-content py-12 [&_section]:not-first:mt-16">
	<section>
		<h2>Partners</h2>
		<p>
			Thousands of people and hundreds of organizations have actively participated in SECAS under
			our partnership’s “big tent”! The people in the chart below didn’t just passively attend a
			presentation—they served on a team, used the Blueprint, attended a workshop, or otherwise put
			their fingerprint on SECAS or its core products.
		</p>

		<figure class="flex flex-col items-center mt-8">
			<enhanced:img
				src="$images/PeopleBubbleChart_withlegend_6-4-2026.jpg?enhanced&format=avif;jpg"
				alt="SECAS partner organizations bubble chart"
				class="border-none max-w-[800px]"
			/>
			<figcaption class="mt-4">
				Each bubble represents an individual person. The larger the circle, the more times that
				person has participated. The color signifies the sector associated with the person’s
				organization affiliation.
			</figcaption>
		</figure>
	</section>
</div>
