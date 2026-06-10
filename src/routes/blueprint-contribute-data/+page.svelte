<script lang="ts">
	import { Head, HeaderImage } from '$lib/components/layout'
	import { resolve } from '$app/paths'

	import HeroImage from '$images/hero/usfws-pelicans-and-terns.jpg?format=avif;webp;jpg&w=3200;1920;720&as=picture'
	const caption =
		'<a href="https://www.fws.gov/media/pelicans-and-terns" target="_blank">Pelicans and terms, Breton National Wildlife Refuge</a>. Photo by USFWS.'
</script>

<Head
	title="Contribute data to the Blueprint"
	description="Learn more about how you can contribute data to the Blueprint"
	imageURL={HeroImage.img.src}
/>

<HeaderImage src={HeroImage} {caption} title="Contribute data to the Blueprint" />

<div class="page-content py-12">
	<section>
		<h2>How to contribute data to the Blueprint</h2>

		<p>
			In addition to providing feedback on the Blueprint by contacting staff or attending a
			workshop, there are a few ways to directly influence the Blueprint by contributing data that
			feeds into the priorities!
		</p>

		<ul>
			<li>
				Digitize in <a href="https://www.openstreetmap.org/#map=5/38.01/-95.84" target="_blank"
					>OpenStreetMap</a
				>! Currently, the Blueprint uses three types of features in OpenStreetMap as part of the
				underlying indicators: greenways and trails, historic sites, and beaches. By contributing
				new data to OpenStreetMap, you can improve the greenways and trails, low-urban historic
				landscapes, and urban park size indicators.
			</li>
			<li>
				If you have fire data, and you're not already contributing it to any of the <a
					href="https://landfire.gov/data-downloads/documents/lutSource_Code_LF2024Events.zip"
					target="_blank">data sources used by LANDFIRE</a
				>, send it directly to LANDFIRE by contacting Brenda Lundberg, LANDFIRE Reference Data
				Administrator, at blundberg@contractor.usgs.gov. This will help improve the fire frequency
				indicator.
			</li>
			<li>
				If you have data on aquatic species observations, make sure it goes to your state natural
				heritage program. The <a href="https://southeastaquatics.net/" target="_blank"
					>Southeast Aquatic Resources Partnership</a
				> aggregates this information so we can use it to improve the imperiled aquatic species indicators.
			</li>
			<li>
				If you have data on protected lands, share it with the <a
					href="https://www.usgs.gov/programs/gap-analysis-project/science/pad-us-data-overview"
					target="_blank">Protected Areas Database of the United States</a
				>
				(PAD-US), America’s official national inventory of U.S. terrestrial and marine protected areas.
				Most states have a designated aggregator who collects and shares data with the PAD-US team. If
				you’re not sure who that is,
				<a href={resolve('/staff/')}>reach out to SECAS staff</a>, and we’ll connect you with the
				right person. Protected areas from PAD-US influence several Blueprint indicators (e.g.,
				urban park size, grassland and savanna extent) as well as the hubs and corridors in the
				connectivity analysis.
			</li>
			<li>
				If you have data on known grassland locations, please send those to Rua at <a
					href="mailto:rua_mordecai@fws.gov">rua_mordecai@fws.gov</a
				>. Because of challenges in remotely sensing grassland condition, the grassland and savanna
				extent indicator is unusual in that it uses known grassland and savanna locations to define
				the highest class, including polygons submitted by experts!
			</li>

			<li>
				If you are aware of or involved in state-led or locally led corridor planning efforts, share
				those with Amy at <a href="mailto:amy_keister@fws.gov">amy_keister@fws.gov</a>! We try to
				ensure the Blueprint connectivity analysis aligns with existing corridor plans. This
				<a
					href={resolve(
						'/2026/03/31/Taking-a-closer-look-at-corridors-in-the-Southeast-Conservation-Blueprint'
					)}>blog from March 2026</a
				> has more information about our ongoing efforts to improve the Blueprint connectivity analysis.
			</li>
		</ul>
	</section>
</div>
