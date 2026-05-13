<script lang="ts">
	import { Head, HeaderImage } from '$lib/components/layout'
	import { Button } from '$lib/components/ui/button'

	import HeroImage from '$lib/assets/images/banner/usfws-manatee.jpg?format=avif;webp;jpg&w=3200;1920;720&as=picture'
	const caption =
		'<a href="https://www.fws.gov/media/manatee-1" target="_blank">Manatee swims near Crystal River National Wildlife Refuge</a>. Photo by Ramos, Keith/USFWS.'
</script>

<Head
	title="Blueprint Data Download"
	description="Download the data for the latest version of the Southeast Conservation Blueprint."
	imageURL={HeroImage.img.src}
/>

<HeaderImage src={HeroImage} {caption} title="Blueprint Data Download" />

<div class="page-content py-12">
	<section>
		<h2>Download Blueprint 2025 data</h2>

		<p>
			The Blueprint download package combines all the Blueprint data and documentation, including:
		</p>
		<ul class="mt-2 list-disc pl-8">
			<li>The final Blueprint priorities</li>
			<li>The Blueprint extent and subregions</li>
			<li>All underlying indicators</li>
			<li>The hubs and corridors</li>
			<li>Code used for each stage of Blueprint development</li>
			<li>
				The <a
					href="https://www.sciencebase.gov/catalog/file/get/68ba6308d4be021908ad78ae?name=Southeast_Blueprint_2025_Development_Process.pdf"
					target="_blank"
				>
					Southeast Blueprint 2025 Development Process
				</a>
				(~4 MB .pdf), which is a final report documenting in detail how the Blueprint was created.
			</li>
			<li>
				The <a
					href="https://www.sciencebase.gov/catalog/file/get/5dc440b3e4b0695797584b9f?name=SE_Blueprint_Changelog.pdf"
					target="_blank">Southeast Blueprint changelog</a
				> (~1 MB .pdf), which records how the Blueprint has changed over time
			</li>
		</ul>

		<div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
			<div>
				<Button
					variant="secondary"
					size="lg"
					href="https://www.sciencebase.gov/catalog/file/get/68ba6308d4be021908ad78ae?name=Southeast_Blueprint_2025_Data_Download.zip"
					target="_blank"
					class="w-full no-underline"
				>
					Download all data
				</Button>
				<div class="text-center text-sm text-muted-foreground">(~2.9 GB .zip)</div>
			</div>
			<div>
				<Button
					variant="secondary"
					size="lg"
					href="https://www.sciencebase.gov/catalog/file/get/68ba6308d4be021908ad78ae?name=Southeast_Blueprint_2025_Data_Download_Caribbean.zip"
					target="_blank"
					class="w-full no-underline"
				>
					Download Caribbean only
				</Button>
				<div class="text-center text-sm text-muted-foreground">(~20 MB .zip)</div>
			</div>
		</div>
		<p class="mt-12">
			The Caribbean-only download package is provided as a smaller file size alternative for users
			who only need the data for Puerto Rico, the U.S. Virgin Islands, and the surrounding nearshore
			marine environment. It includes only the portions of the above spatial data and associated
			code that cover the U.S. Caribbean, as well as the full Southeast Blueprint documentation.
			<br /><br />
		</p>
	</section>
	<section>
		<h4>Supplementary data package</h4>
		<div class="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
			<div>
				<p>
					Some intermediate Blueprint datasets are too large to fit in the main data download
					package. The supplementary package includes:
				</p>
				<ul class="mt-2 list-disc pl-8">
					<li>Combined continuous Zonation results</li>
					<li>Several intermrediate layers used in indicator development</li>
					<li>Several intermediate layers used in the Linkage Mapper connectivity analysis</li>
				</ul>
			</div>
			<div>
				<Button
					variant="secondary"
					size="lg"
					href="https://www.sciencebase.gov/catalog/file/get/68ba6308d4be021908ad78ae?name=Southeast_Blueprint_2025_Data_Download.zip"
					target="_blank"
					class="w-full no-underline"
				>
					Download ancillary package
				</Button>
				<div class="text-center text-sm text-muted-foreground">(~2.8 GB .zip)</div>
			</div>
		</div>
	</section>
</div>
