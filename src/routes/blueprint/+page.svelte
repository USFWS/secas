<script lang="ts">
	import { asset, resolve } from '$app/paths'
	import { Head, HeaderImage } from '$lib/components/layout'
	import { Button } from '$lib/components/ui/button'
	import { BlueprintStep } from '$lib/components/elements'

	import HeroImage from '$images/hero/big-lake-national-wildlife-refuge-bottomland-hardwoods.jpg?format=avif;jpg&w=3200;1600;800&as=picture'
	const caption =
		'Cypress trees at <a href="http://www.fws.gov/biglake/" target="_blank">Big Lake National Wildlife Refuge</a>. Photo by Jeremy Bennett, USFWS.'

	import BlueprintStep1Image from '$images/blueprint_step1.jpg?enhanced&format=avif;jpg'
	import BlueprintStep2Image from '$images/blueprint_step2.jpg?enhanced&format=avif;jpg'
	import BlueprintStep3Image from '$images/blueprint_step3.jpg?enhanced&format=avif;jpg'
	import BlueprintStep4Image from '$images/blueprint_step4.jpg?enhanced&format=avif;jpg'
	import BlueprintStep5Image from '$images/blueprint_step5.jpg?enhanced&format=avif;jpg'
</script>

<Head
	title="Southeast Conservation Blueprint"
	description="The Blueprint is a living, spatial plan that identifies priority areas for a connected network of lands and waters across the Southeast and Caribbean."
	imageURL={HeroImage.img.src}
/>

<HeaderImage
	src={HeroImage}
	{caption}
	title="Southeast Conservation Blueprint"
	class="[&>div]:mt-0"
/>

<div class="page-content py-12">
	<section>
		<h2>
			The Blueprint is a living, spatial plan that identifies priority areas for a connected network
			of lands and waters across the Southeast and Caribbean.
		</h2>
		<p class="mt-4 text-lg">
			The Southeast Conservation Blueprint is the primary product of SECAS. The Blueprint is more
			than just a map. It’s a living spatial plan to achieve the SECAS vision of a connected network
			of lands and waters across the Southeast and U.S. Caribbean. <b>More than 500 people</b> from
			<b> over 200 organizations </b> have used or are using the Blueprint in their work. So far,
			the Southeast Blueprint has helped bring in
			<b>more than $410 million in conservation funding</b>
			to protect and restore <b>over 410,000 acres</b>.
		</p>

		<div class="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-12">
			<p class="text-lg">
				The Blueprint identifies priority areas based on
				<a href={resolve('/blueprint-indicators/')}
					>a suite of natural and cultural resource indicators</a
				>
				representing terrestrial, freshwater, and marine ecosystems. A connectivity analysis identifies
				corridors that link coastal and inland areas and span climate gradients. Because the Blueprint
				is a living plan, it will evolve over time, driven by improvements to the underlying science,
				our growing understanding of on-the-ground conditions, and input from new partners. So far, more
				than 2,600 people from over 650 different organizations have actively participated in developing
				the Southeast Blueprint.
			</p>
			<figure class="mt-4 max-w-[800px]">
				<enhanced:img
					src="$images/FebStCroixWorkshopVIReview2_HCLMedit.jpg?enhanced&format=avif;jpg"
					alt="A group of conservation professionals investigating a map"
					class="border border-grey-4"
				/>
				<figcaption>
					Conservation professionals review an early draft of Southeast Conservation Blueprint 2023
					in the U.S. Virgin Islands at <a
						href="http://secassoutheast.org/2023/02/24/Caribbean-Community-of-Practice-kickoff-meeting-in-Christiansted-St-Croix.html"
						target="_blank"
						>a meeting of the Caribbean Community of Practice in Christiansted, St. Croix</a
					>. Photo by Rua Mordecai.
				</figcaption>
			</figure>
		</div>
	</section>

	<!-- Hilary: enable workshop block here -->
	<!-- <section class="bg-blue-1/50 rounded-lg p-4 mt-16 border-blue-8/50 border-2 mb-24">
		<div class="font-bold text-2xl">Participate in a Blueprint workshop!</div>
		<p>
			Your input helps to ensure the Blueprint represents on-the-ground conditions and captures your
			conservation priorities, and also helps staff prioritize future improvements.
			<br /><br />

			<a href={resolve('/workshops/')}>Register for a workshop</a>.
		</p>
	</section> -->

	<section>
		<h2>Blueprint Version 2025</h2>

		<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
			<div>
				<Button
					variant="secondary"
					size="lg"
					href="https://apps.fws.gov/southeastblueprint/"
					target="_blank"
					class="w-full no-underline"
				>
					Start simple in the Explorer
				</Button>
			</div>
			<div>
				<Button
					variant="secondary"
					size="lg"
					href="https://secas-fws.hub.arcgis.com/pages/blueprint"
					target="_blank"
					class="w-full no-underline"
					>Dig deeper in our atlas
				</Button>
			</div>
			<div>
				<Button
					variant="secondary"
					size="lg"
					href={resolve('/blueprint-data-download')}
					class="w-full no-underline"
				>
					Download the GIS data
				</Button>
			</div>
		</div>

		<p class="mt-6">
			Southeast Blueprint 2025 was released in December 2025 after the SEAFWA annual conference.
			Version 2025 included numerous new and improved indicators in the inland, freshwater, and
			coastal areas of the continental Southeast and U.S. Caribbean. It also used refined
			prioritization and connectivity methods.
			<br /><br />
			You can
			<a href="https://secas-fws.hub.arcgis.com/pages/blueprint" target="_blank"
				>explore and download the data on the Blueprint page of the SECAS Atlas</a
			>, a free online mapping platform. There, you can also read more about the methods and
			underlying datasets used to create Version 2025.
		</p>

		<div class="mt-8 flex justify-center">
			<figure>
				<enhanced:img
					src="$images/SEBP2025_horizontal_web.jpg?enhanced&format=avif;jpg"
					alt="A map depicting key priority areas for achieving the SECAS vision of a connected network of lands and waters. Priority areas are shown in shades of purple and gray. Darkest purple represents highest priority, middle purple high priority, and lightest purple medium priority. Gray represents priority connections between the purple areas."
					class="border border-grey-4"
					loading="lazy"
				/>
				<figcaption>
					<a href="https://secas-fws.hub.arcgis.com/pages/blueprint" target="_blank"
						>Southeast Conservation Blueprint Version 2025</a
					> identifies priority areas for a connected network of lands and waters across the Southeast
					and U.S. Caribbean.
				</figcaption>
			</figure>
		</div>
	</section>

	<section>
		<h2>Blueprint categories</h2>
		<div class="mt-2 grid grid-cols-1 gap-4 leading-snug lg:grid-cols-4 lg:gap-8">
			<div>
				<div class="text-lg font-bold underline">Highest priority:</div>
				Areas where conservation action would make the biggest impact, based on a suite of natural and
				cultural resource indicators. This class covers roughly 10% of the Southeast Blueprint geography.
			</div>
			<div>
				<div class="text-lg font-bold underline">High priority:</div>
				Areas where conservation action would make a big impact, based on a suite of natural and cultural
				resource indicators. This class covers roughly 15% of the Southeast Blueprint geography.
			</div>
			<div>
				<div class="text-lg font-bold underline">Medium priority:</div>
				Areas where conservation action would make an above-average impact, based on a suite of natural
				and cultural resource indicators. This class covers roughly 20% of the Southeast Blueprint geography.
			</div>
			<div>
				<div class="text-lg font-bold underline">Priority connections:</div>
				Connections between priority areas that cover the shortest distance possible while routing through
				as much Blueprint priority as possible. This class covers roughly 5% of the Southeast Blueprint
				geography.
			</div>
		</div>
	</section>

	<section>
		<h2>A few things to keep in mind as you explore the Blueprint</h2>
		<ul>
			<li>
				The Blueprint identifies areas where conservation action would have the biggest impact for a
				connected network of lands and waters. A range of conservation activities could benefit
				those priority areas, including management, economic incentives, and protection.
			</li>
			<li>
				The Blueprint is not intended to be used in isolation of other datasets. Instead, it
				provides a regional perspective that, in combination with local data and knowledge, can help
				inform decisions about where to focus conservation action in the face of future change.
			</li>
			<li>
				As a living spatial plan, the Blueprint is always a work in progress. It is updated annually
				to incorporate new data and feedback from experts and Blueprint users.
			</li>
			<li>
				If you want to find your piece of the Blueprint, you can explore the underlying indicator
				and connectivity data. These layers can help identify important areas for corridors, birds,
				water quality, climate resilience, prescribed burning, reforestation, and more. They can
				also help you tell the unique story of what makes your area of interest special.
				<a href={resolve('/staff/')}> Contact a member of Blueprint user support staff</a> if you’d like
				some help.
			</li>
		</ul>
	</section>

	<section>
		<h2>Blueprint methods</h2>

		<BlueprintStep
			step={1}
			title="Start with natural and cultural resource indicators"
			img={BlueprintStep1Image}
		>
			The terrestrial, freshwater, and coastal/marine ecosystems of the Southeast and U.S. Caribbean
			are represented by
			<a href={asset('/pdf/IndicatorCheatSheet_2025.pdf')} target="_blank"
				>68 natural and cultural resource indicators</a
			>. They serve as the data building blocks of the Blueprint. Each indicator represents a unique
			natural feature, cultural resource, or element of ecosystem health. Because they _indicate_
			for other apsects of intact, functional ecosystems, the indicators are intended to
			collectively represent the richness and complexity of the lands and waters of the region, and
			the necessary components of the connected network called for in the SECAS vision.
		</BlueprintStep>

		<BlueprintStep step={2} title="divide the region into zones" img={BlueprintStep2Image}>
			The SECAS geography is divided into 7 zones created by grouping 22 smaller subregions.
			Reservoirs are removed from the zones because the current set of indicators does not do a good
			job of distinguishing the important parts of reservoirs.
		</BlueprintStep>

		<BlueprintStep
			step={3}
			title="use indicators to rank areas within zones"
			img={BlueprintStep3Image}
		>
			A conservation planning software program called
			<a href="https://zonationteam.github.io/Zonation5/" target="_blank"> Zonation</a> ranks the
			pixels in each zone according to their importance for all the indicators collectively. This
			ensures that the Blueprint includes high-value areas for every indicator as part of a balanced
			portfolio. Pixels that rank higher in Zonation become higher priority in the Blueprint. The
			subregions are also used as inputs to Zonation to better balance priorities within zones.
			<a href={asset('/pdf/ZonationRules_Z5.pdf')} target="_blank">
				Zonation uses a few simple rules
			</a> to prioritize.
		</BlueprintStep>

		<BlueprintStep
			step={4}
			title="add connectivity by identifying corridors linking hubs"
			img={BlueprintStep4Image}
		>
			Using a software program called
			<a href="https://linkagemapper.org/" target="_blank">Linkage Mapper</a>, a least-cost path
			connectivity analysis identifies corridors that link hubs across the shortest distance
			possible, while also routing through as much Blueprint priority as possible. In the
			continental Southeast, hubs are large patches (~5,000+ acres) of highest priority Blueprint
			areas and/or protected lands. In the Caribbean, hubs are large patches (~125+ acres) of
			highest priority Blueprint areas and/or protected lands.
		</BlueprintStep>

		<BlueprintStep
			step={5}
			title="combine priority areas and corridors in the Blueprint"
			img={BlueprintStep5Image}
		>
			Combining the areas of highest Zonation ranking with the corridors produces Southeast
			Blueprint 2025. For more details, see the <a
				href="https://www.sciencebase.gov/catalog/file/get/68ba6308d4be021908ad78ae?name=Southeast_Blueprint_2025_Development_Process.pdf"
				target="_blank">Southeast Blueprint 2025 Development Process</a
			> final report.
		</BlueprintStep>
	</section>

	<section>
		<h2>Known issues</h2>
		<p>
			As a living spatial plan, the Blueprint is always a work in progress. We maintain a list of
			the problems with the Blueprint that have been identified in the review process so far, which
			we call “known issues”. These known issues are part of our commitment to transparently
			documenting the Blueprint’s strengths and weaknesses. They also help us prioritize the most
			important issues to fix in the next update cycle.
			<br /><br />
			The known issues identified with Southeast Conservation Blueprint 2025 are captured on

			<a href={resolve('/blueprint-known-issues/')}>the known issues page</a>
			and in the

			<a
				href="https://www.sciencebase.gov/catalog/file/get/68ba6308d4be021908ad78ae?name=Southeast_Blueprint_2025_Development_Process.pdf"
				target="_blank"
			>
				Southeast Blueprint 2025 Development Process
			</a> final report.
		</p>
	</section>

	<section>
		<h2>Contact Blueprint staff</h2>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
			<p>
				Do you have a question about the Blueprint? Would you like help using the Blueprint to
				support a proposal or inform a decision? Staff across the Southeast are here to support you!
				You can also explore the
				<a
					href="https://www.sciencebase.gov/catalog/file/get/5c81380ce4b0938824476207?name=SoutheastBlueprintUserGuide.pdf"
					target="_blank"
				>
					Online Guide to using the Southeast Blueprint
				</a>, which will walk you through how to use it on your own.
				<br /><br />
				The Blueprint is also revised based on input from people like you. So if you have a suggestion
				on how to improve the Blueprint, let us know!
			</p>
			<div class="md:mt-1">
				<a href={resolve('/staff/')} class="text-foreground no-underline">
					<div
						class="rounded-lg border-2 border-blue-8/50 bg-blue-1/50 px-4 py-2 text-lg text-foreground hover:border-blue-8 hover:bg-blue-1"
					>
						<div class="text-xl leading-tight font-bold">Get help using the Blueprint!</div>
						<p class="mt-1">
							To get help or provide feedback, visit the <span class="text-link underline"
								>staff page</span
							> to contact a user support team member.
						</p>
					</div>
				</a>
			</div>
		</div>
	</section>

	<section>
		<h2>Who’s using the Blueprint</h2>

		<div class="flex justify-center">
			<figure class="max-w-[800px]">
				<enhanced:img
					src="$images/TN_SWAP_SECAS_web.jpg?enhanced&format=avif;jpg"
					alt="Man stands at podium presenting next to a screen showing maps of Tennessee, one of which is the purple priorities of the Southeast Conservation Blueprint."
					class=" border border-grey-4"
					loading="lazy"
				/>
				<figcaption>
					The TN Wildlife Resources Agency explores using the Southeast Blueprint in their 2025 SWAP
					update. Photo by Ricky Martini with Walnut House event venue, used with permission.
				</figcaption>
			</figure>
		</div>

		<h4 class="mt-12">Specific examples of how the Blueprint has been used include:</h4>
		<ul>
			<li>
				A regional Council of Government used the Blueprint to help a town refine the natural
				habitat cores in their comprehensive plan.
			</li>
			<li>
				A broad coalition of 49 military and conservation partners used the Blueprint to help
				establish a new Sentinel Landscapes Partnership.
			</li>
			<li>
				A Tribe used the Blueprint to seek funds to restore grasslands, rivercane, and aquatic
				connectivity on ancestral lands.
			</li>
			<li>
				A local African American community organization used the Blueprint to help communicate the
				natural resource benefits of a cultural heritage trail.
			</li>
			<li>
				A watershed partnership used the Blueprint to help develop a land protection strategy.
			</li>
			<li>
				A National Wildlife Refuge Manager used the Blueprint to support a proposal for funding to
				help recover an endangered salamander.
			</li>
			<li>
				A private company used the Blueprint in a confidential analysis to support its business.
			</li>
			<li>
				A state wildlife agency used the Blueprint to support a proposal for funding to protect
				coastal wetlands and improve public access to recreation opportunities.
			</li>
			<li>
				Longleaf pine conservation partnerships used the Blueprint to identify restoration and
				management priorities.
			</li>
			<li>
				A nonprofit organization used the Blueprint to support a critical source of conservation
				funding at its state legislature.
			</li>
			<li>A National Forest used the Blueprint to inform its public lands planning.</li>
		</ul>
		<p class="mt-4">
			These are just a few of the more than 380 Blueprint uses completed so far, with nearly 30
			still in progress! For more in-depth examples of how the Blueprint is being used, check out
			the <a href={resolve('/story-map')}>SECAS in Action story map</a>. You can also
			<a href={resolve('/organizations-using-the-blueprint/')}
				>see a detailed list of the organizations using the Blueprint</a
			>.
		</p>
	</section>

	<section>
		<h2>The history of the Blueprint</h2>

		<p>
			In the fall of 2013, SECAS leadership set a goal of developing a first-generation Southeast
			Blueprint for landscape-scale conservation by the fall of 2016. Many different conservation
			planning efforts were already underway, but most eco-regional plans only covered parts of
			states, while state-specific plans stopped at the state line. The results of all this parallel
			planning did not yet add up to an integrated regional strategy.
		</p>

		<div class="mt-4 grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr]">
			<p>
				<b>Version 1.0 of the Southeast Blueprint</b> was released three years later in December
				2016. Development of this first Blueprint relied heavily on Landscape Conservation
				Cooperative (LCC) partnerships across the Southeast and U.S. Caribbean.
				<br /><br />

				This plan provided the first ever integration of spatial plans developed through the South
				Atlantic, Appalachian, Gulf Coastal Plains and Ozarks, Gulf Coast Prairie, North Atlantic,
				Peninsular Florida and Caribbean LCCs.
			</p>

			<div>
				<figure class="mt-2">
					<enhanced:img
						src="$images/secas-at-seafwa.jpg?enhanced&format=avif;jpg"
						alt="A conference room full of conservationists discussing the progress of the SECAS effort"
						loading="lazy"
					/>
					<figcaption>
						Ed Carter, Executive Director of the Tennessee Wildlife Resources Agency, speaks about
						the history and importance of SECAS alongside Cindy Dohner, Southeast Regional Director
						of the U.S. Fish and Wildlife Service. This SECAS symposium took place at the 2016
						annual conference of the Southeastern Association of Fish and Wildlife Agencies
						(SEAFWA).
					</figcaption>
				</figure>
			</div>
		</div>

		<p class="mt-8">
			It also included priorities from the Mississippi River Basin/Gulf Hypoxia Initiative
			spearheaded by seven LCCs (Appalachian, Eastern Tallgrass Prairie and Big Rivers, Great
			Plains, Gulf Coast Prairie, Gulf Coastal Plains and Ozarks, Plains and Prairie Potholes, and
			Upper Midwest and Great Lakes).
			<br /><br />
			<b>Version 2.0 of the Southeast Blueprint</b> was released in November 2017. This plan incorporated
			the improved subregional Blueprints from several LCCs and established priority connections with
			western states through the Crucial Habitat Assessment Tool. Significant improvements over Version
			1.0 included improved consistency across LCC boundaries, improved consistency in climate change
			response, and improved integration beyond the Southeast.
		</p>

		<div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1fr_16rem] md:gap-8">
			<p>
				<b>Version 3.0 of the Southeast Blueprint</b> was first introduced at the October 2018 SEAFWA
				annual conference, and officially released in February 2019. Its development occurred during a
				time of transition for the LCC Network where the structure and function of some LCCs was changing.
				Despite these changes, the capacity and commitment to continue to support Blueprint users and
				improve the Southeast Blueprint remains strong, evidenced by the many examples of Blueprint implementation,
				as well as progress on Blueprint improvements. Blueprint 3.0 added full coverage of Texas, integrated
				threat layers covering the full Southeast, and a hubs and corridors layer covering part of the
				region.
			</p>
			<div>
				<figure class="mt-1 max-w-[32rem]">
					<enhanced:img
						src="$images/SEBPv3_horizontal_web.jpg?enhanced&format=avif;jpg"
						alt="Blueprint version 3.0 map"
						loading="lazy"
					/>
					<figcaption>Southeast Blueprint v3</figcaption>
				</figure>
			</div>
		</div>

		<div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1fr_16rem] md:gap-8">
			<p>
				<b>Version 4.0 of the Southeast Blueprint</b> was released in October 2019 at the SEAFWA annual
				conference. Improvements over the previous version included: corrected overprioritization in Texas,
				Oklahoma, and the mountains of West Virginia and Virginia; improved priorities in the Lower Mississippi
				Valley, Louisiana marshes, and the Southern Appalachians; updated inputs from Florida and the
				Middle South subregion; expanded marine coverage to include state and federal waters around Florida;
				and expanded hubs and corridors that now cover all of Florida.
			</p>
			<div>
				<figure class="mt-1 max-w-[32rem]">
					<enhanced:img
						src="$images/SEBPv4_horizontal_web.jpg?enhanced&format=avif;jpg"
						alt="Blueprint version 4.0 map"
						loading="lazy"
					/>
					<figcaption>Southeast Blueprint v4</figcaption>
				</figure>
			</div>
		</div>

		<div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1fr_16rem] md:gap-8">
			<p>
				<b>Southeast Blueprint 2020</b> was released in October 2020 at the virtual SEAFWA annual conference.
				Significant improvements over the previous versions included: finer resolution and a more connected
				network of priorities in the inland South Atlantic subregion; updated data and a more consistent
				approach to cross-state prioritization in the Middle Southeast subregion; and better integration
				in areas of overlap between the South Atlantic Blueprint, Florida Blueprint, and Nature's Network
				design.
			</p>
			<div>
				<figure class="mt-1 max-w-[32rem]">
					<enhanced:img
						src="$images/SEBP2020_horizontal_web.png?enhanced&format=avif;png"
						alt="Blueprint 2020 map"
						loading="lazy"
					/>
					<figcaption>Southeast Blueprint 2020</figcaption>
				</figure>
			</div>
		</div>

		<div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1fr_16rem] md:gap-8">
			<p>
				<b>Southeast Blueprint 2021</b> was released in November 2021 following the virtual SEAFWA annual
				conference. Significant improvements over the previous versions included: updated and improved
				indicators, better incorporation of equity, deep-sea coral, fire, and important grasslands, and
				multiple connectivity improvements in the South Atlantic subregion, as well as correcting a scoring
				issue in the Middle Southeast subregion.
			</p>
			<figure class="mt-1 max-w-[32rem]">
				<enhanced:img
					src="$images/SEBP2021_horizontal_web.png?enhanced&format=avif;png"
					alt="Blueprint 2021 map"
					loading="lazy"
				/>
				<figcaption>Southeast Blueprint 2021</figcaption>
			</figure>
		</div>

		<div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1fr_16rem] md:gap-8">
			<p>
				<b>Southeast Blueprint 2022</b> was released in October 2022 at the SEAFWA annual conference.
				Rather than continuing to stitch together so many different subregional plans, the 2022 Blueprint
				took massive strides toward regional consistency by using the same methods and indicators across
				15 states of the Southeast. To provide more complete coverage of the SECAS geography, it also
				incorporated two additional input plans: the latest update to the Florida Marine Blueprint for
				marine areas in Florida and the Caribbean Landscape Conservation Design for inland areas in Puerto
				Rico.
			</p>
			<figure class="mt-1 max-w-[32rem]">
				<enhanced:img
					src="$images/SEBP2022_horizontal_web.png?enhanced&format=avif;png"
					alt="Blueprint 2022 map"
					loading="lazy"
				/>
				<figcaption>Southeast Blueprint 2022</figcaption>
			</figure>
		</div>

		<div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1fr_16rem] md:gap-8">
			<p>
				<b>Southeast Blueprint 2023</b> was released in October 2023 at the SEAFWA annual conference.
				For the first time, this Blueprint used a consistent approach across the entire geography and
				did not have to stitch together any subregional inputs. The 2023 Blueprint expanded consistent
				methods and indicators to Puerto Rico, the U.S. Virgin Islands, and nearshore U.S. Caribbean waters,
				as well as to the full extent of U.S. waters in the Atlantic Ocean and Gulf of America. This update
				significantly improved the older expert-driven, watershed-scale priorities for Puerto Rico, and
				the previous priorities for parts of the Atlantic and Gulf marine areas. It added new coverage
				of the U.S. Virgin Islands, U.S. Caribbean nearshore waters, and the rest of the Gulf and Atlantic
				marine environment. It also included minor refinements to the inland continental Southeast priorities
				and updated hubs and corridors for the full Blueprint area.
			</p>
			<figure class="mt-1 max-w-[32rem]">
				<enhanced:img
					src="$images/SEBP2023_horizontal_web.png?enhanced&format=avif;png"
					alt="Blueprint 2023 map"
					loading="lazy"
				/>
				<figcaption>Southeast Blueprint 2023</figcaption>
			</figure>
		</div>

		<div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1fr_16rem] md:gap-8">
			<p>
				<b>Southeast Blueprint 2024</b> was released in October 2024 ahead of the SEAFWA annual conference.
				Version 2024 focused on updating the priorities in the continental Southeast. It used refined
				prioritization and connectivity methods and incorporated a number of new and improved indicators
				for both inland and marine areas.
			</p>

			<figure class="mt-1 max-w-[32rem]">
				<enhanced:img
					src="$images/SEBP2024_horizontal_web.jpg?enhanced&format=avif;jpg"
					alt="Blueprint 2024 map"
					loading="lazy"
				/>
				<figcaption>Southeast Blueprint 2024</figcaption>
			</figure>
		</div>

		<div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1fr_16rem] md:gap-8">
			<p>
				<b>Southeast Blueprint 2025</b> was released in December 2025 following the SEAFWA annual conference.
				Version 2025 included numerous new and improved indicators in the inland, freshwater, and coastal
				areas of the continental Southeast and U.S. Caribbean. It also used refined prioritization and
				connectivity methods.
			</p>
			<figure class="mt-1 max-w-[32rem]">
				<enhanced:img
					src="$images/SEBP2025_horizontal_web.jpg?enhanced&format=avif;jpg"
					alt="Blueprint 2025 map"
					loading="lazy"
				/>
				<figcaption>Southeast Blueprint 2025</figcaption>
			</figure>
		</div>
	</section>
</div>
