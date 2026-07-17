<script lang="ts">
	import { asset, resolve } from '$app/paths'
	import { Head, HeaderImage } from '$lib/components/layout'

	import HeroImage from '$images/hero/virginia-creeper-trail.jpg?format=avif;jpg&w=3200;1600;800&as=picture'
	const caption =
		'Virginia Creeper Trail, Virginia. <a href="https://flic.kr/p/ha1wb5" target="_blank">Photo</a> by <a href="https://flickr.com/photos/27864969@N00/" target="_blank">Stephen Taylor</a>, <a href="https://creativecommons.org/licenses/by-nc/2.0/" target="_blank">CC BY-NC 2.0</a>'
</script>

<Head
	title="Resources"
	description="Explore resources and tools from the Southeastern Conservation Adaptation Strategy."
	imageURL={HeroImage.img.src}
/>

<HeaderImage src={HeroImage} {caption} title="Resources" />

<div
	class="page-content py-12 [&_section]:not-first-of-type:mt-6 [&_section]:not-first-of-type:border-t [&_section]:not-first-of-type:border-t-grey-2 [&_section]:not-first-of-type:pt-6"
>
	<section>
		<h2>The Southeast Conservation Blueprint</h2>
		<p>
			The Southeast Conservation Blueprint is a living, spatial plan that identifies priority areas
			for a connected network of lands and waters.
		</p>
		<ul>
			<li><a href={resolve('/blueprint/')}>Visit the Blueprint page to learn more</a></li>
			<li>
				<a href="https://apps.fws.gov/southeastblueprint/" target="_blank"
					>Start simple in the Blueprint Explorer</a
				>
			</li>
			<li>
				<a href="https://secas-fws.hub.arcgis.com/pages/blueprint" target="_blank"
					>Dig deeper into the Blueprint on the SECAS Atlas</a
				>
			</li>
			<li>
				<a href={resolve('/blueprint-data-download')}>Download the GIS data and documentation</a>
			</li>
			<li>
				<a href={resolve('/blueprint-state-reports/')}> Access state-level Blueprint reports</a>
			</li>
			<li>
				<a
					href="https://www.sciencebase.gov/catalog/file/get/68ba6308d4be021908ad78ae?name=Southeast_Blueprint_2025_Development_Process.pdf"
					target="_blank">Read how the Blueprint was developed</a
				> (including detailed methods and data sources)
			</li>
		</ul>
	</section>

	<section>
		<h2>Recent trends in Southeastern ecosystems</h2>
		<p>
			We measure progress toward the SECAS 10% goal using the best available data from existing
			Southeast-wide monitoring programs since SECAS was established in 2011.
		</p>
		<ul>
			<li><a href={asset('/pdf/SECAS-goal-report-2024.pdf')}>Read the 2024 PDF report</a></li>
			<li>
				<a
					href="https://storymaps.arcgis.com/stories/857b5b1fbd884d199051f42335fd5aef"
					target="_blank">Explore the 2024 results in an interative story map</a
				>
			</li>
			<li><a href={resolve('/our-goal/')}>Learn more about the SECAS 10% goal</a></li>
		</ul>
	</section>

	<section>
		<h2>
			Supporting Southeastern Association of Fish and Wildlife Agencies (SEAFWA) states and
			territories
		</h2>
		<h4 class="mt-4">Regional Species of Greatest Conservation Need</h4>
		<p class="mt-2">
			The SEAFWA's Wildlife Diversity Committee has developed a list of “Regional Species of
			Greatest Conservation Need” (RSGCN) that highlights the region’s extraordinary biodiversity
			and endemism and identifies priority species for cross-state cooperation. This list includes
			Threatened, Endangered, and At-risk species and helps highlight where federal and state
			priorities can intersect. SECAS has leveraged RSGCNs heavily to help meet the needs of state
			partners in the region, including using them as a foundation for several indicators in the
			Blueprint and for giving a regional perspective to State Wildlife Action Plans.
		</p>

		<div class="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
			<div>
				<div class="text-lg font-bold">Animals</div>

				<ul>
					<li>
						<a href={resolve('/2019/09/30/Priorities-for-Conservation-in-Southeastern-States')}
							>Read this blog to learn more</a
						>
					</li>
					<li>
						<a
							href="https://www.nwf.org/Our-Work/Wildlife-Conservation/southeast-regional-priority-species"
							target="_blank"
							>Visit the website for this project to download animal RSGCN lists by taxanomic group</a
						>
					</li>
					<li>
						<a
							href="https://www.nwf.org/-/media/Documents/PDFs/Wildlife-Conservation/Southeast-RSGCN/Southeast-Regional-Responsibility-RSGCN.pdf?sc_lang=en&hash=3832BA5D86477EF9D286B599DA78795E"
							target="_blank">See the full list of all animal RSGCN (pdf)</a
						>
					</li>
					<li>
						<a href={asset('/pdf/SEAFWA_RSGCN_Final_Report_20190715.pdf')} target="_blank"
							>Read the final report for this project</a
						>
					</li>
				</ul>
			</div>

			<div>
				<div class="text-lg font-bold">Plants</div>
				<ul>
					<li>
						<a href={resolve('/2023/12/18/The-nations-first-RSGCN-list-for-plants')}
							>Read this blog to learn more</a
						>
					</li>
					<li>
						<a href="https://www.se-pca.org/southeastern-plants-rsgcn/" target="_blank"
							>Visit the website for this project</a
						>
					</li>
					<li>
						<a href="https://www.se-pca.org/southeastern-plants-rsgcn-list-2/" target="_blank"
							>Download the plant RSGCN list (.xlsx)</a
						>
					</li>
					<li>
						<a
							href="https://www.se-pca.org/wp-content/uploads/2023/10/SE-PCA_publication_final_Booklet_23.pdf"
							target="_blank">Read the final report</a
						>
					</li>
				</ul>
			</div>
		</div>

		<h3 class="mt-12">State Wildlife Action Plan Alignment Survey</h3>
		<p>
			In 2021, SECAS assisted with a survey of Southeast State Wildlife Action Plan (SWAP)
			coordinators to help improve regional SWAP alignment.
		</p>
		<ul>
			<li>
				<a href={asset('/pdf/SWAP_alignment_survey_results_2021.pdf')} target="_blank"
					>Read a brief report summarizing the survey results and next steps</a
				>
			</li>
			<li>
				<a href={asset('/pdf/2021SWAPCoordinatorSurvey_Results_20210902.pdf')} target="_blank"
					>See a full export of the survey results</a
				>
			</li>
		</ul>
	</section>

	<section>
		<h2>The 2020 SECAS Futures Project</h2>

		<p>
			The 2020 SECAS Futures Project was a year-long effort to examine how SECAS is adding value to
			partner organizations and sustaining progress toward meeting its vision and goal. The final
			report provides a comprehensive evaluation of the partnership.
			<br /><br />
			<a href={asset('/pdf/SECAS_Futures_final_report_March_2021.pdf')} target="_blank"
				>Read <i
					>SECAS Futures: Structuring Governance to Achieve Landscape-scale Conservation Outcomes</i
				></a
			>
			<br /><br />
			One of the recommendations of the Futures Project was development of the
			<a href={asset('/pdf/SECAS_final_Purpose_Statement_approved_5-24-2021.pdf')} target="_blank"
				>SECAS Statement of Shared Purpose</a
			> (2021), which was collaboratively developed among the SECAS Points of Contact, SECAS staff, Steering
			Committee, and other partnership representatives to improve coordination and communication about
			SECAS while providing greater detail on the vision, structure, function and organization of the
			initiative.
		</p>
	</section>

	<section>
		<h2>SECAS Logo</h2>
		<p>Need to use the SECAS logo?</p>
		<ul>
			<li>
				<a href={asset('/pdf/SECAS_Logo_Usage_Guide_web.pdf')} target="_blank"
					>View the SECAS logo usage guidelines</a
				>
			</li>
			<li>
				<a href={asset('/SECASLogoFiles.zip')} target="_blank">Download the logo image files</a>
			</li>
		</ul>
	</section>
</div>
