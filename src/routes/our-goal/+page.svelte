<script lang="ts">
	import { asset } from '$app/paths'
	import { HeaderImage } from '$lib/components/layout'
	import { Button } from '$lib/components/ui/button'

	import HeroImage from '$lib/assets/images/hero/longleaf-pine-at-carolina-sandhills-national-wildlife-refuge.jpg'
	const caption =
		'Longleaf pine at <a href="https://www.fws.gov/refuge/Carolina_Sandhills/">Carolina Sandhills National Wildlife Refuge</a>, South Carolina. <a href="https://flic.kr/p/c4cwFj">Photo</a> by Jack Culpepper, USFWS.'
</script>

<HeaderImage src={HeroImage} {caption} title="Our Goal" imageClass="brightness-85" />

<div class="page-content py-12">
	<section class="text-lg">
		<h2>
			Our goal: a 10% or greater improvement in the health, function, and connectivity of
			Southeastern ecosystems by 2060.
		</h2>

		<p class="mt-4">Near-term metrics:</p>
		<ul class=" list-disc pl-8">
			<li>
				1% improvement in the health, function, and connectivity of Southeastern ecosystems every 4
				years
			</li>
			<li>
				1% increase in conservation actions within the Southeast Conservation Blueprint every 4
				years
			</li>
		</ul>
		<p class="mt-4">
			To read more, <a href={asset('/pdf/SECAS-goal-1-pager.pdf')}
				>view this 1-pager on the SECAS goal</a
			>.
		</p>
	</section>

	<section>
		<h2>Progress toward achieving the goal</h2>
		<p>
			The 2024 progress report, <i>Recent trends in Southeastern ecosystems</i>, is available in two
			formats:
		</p>
		<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
			<div>
				<Button
					variant="secondary"
					size="lg"
					href={asset('/pdf/SECAS-goal-report-2024.pdf')}
					target="_blank"
					class="w-full no-underline"
				>
					Read the 2024 progress report
				</Button>
			</div>

			<div>
				<Button
					variant="secondary"
					size="lg"
					href="https://storymaps.arcgis.com/stories/857b5b1fbd884d199051f42335fd5aef"
					target="_blank"
					class="w-full no-underline"
				>
					Explore the results in a story map
				</Button>
			</div>
		</div>

		<p class="mt-8">
			The report is based on the best available data from existing Southeast-wide monitoring
			programs since SECAS was established in 2011. Here's a snapshot from the report showing
			whether each indicator is on track for a 1% or greater improvement every four years:
		</p>

		<div class="flex justify-center">
			<figure class="mt-6">
				<enhanced:img
					src="$lib/assets/images/2024_indicatorconditionfigure_crop.png"
					alt="Indicator scores from the report"
					class="max-w-[800px] border border-grey-4 p-2"
				/>
				<figcaption>
					Estimated percent change in indicator over 4 years, based on best available data since
					SECAS was established in 2011.
				</figcaption>
			</figure>
		</div>
	</section>

	<section>
		<h2>Intended uses for the goal</h2>
		<ul class="list-disc pl-8">
			<li>
				<b>Provide a simple description of what SECAS is trying to do:</b> This will complement the broad
				SECAS vision of designing and achieving a connected network of lands and waters that supports
				thriving fish and wildlife populations and improved quality of life for people.
			</li>
			<li>
				<b>Attract additional sources of conservation funding to the Southeast:</b> A shared goal and
				measurement system can help communicate the need for additional funding.
			</li>
			<li>
				<b>Identify new opportunities for collaboration around shared interests:</b> A shared goal and
				understanding of Southeastern ecosystem condition can help reveal new ways to work together that
				may not be obvious when looking at species and ecosystems in isolation.
			</li>
			<li>
				<b>Improve connections with “non-traditional” partners:</b> A shared goal can help improve communication
				with private landowners, urban planners, forestry/agricultural interests, the Department of Defense,
				and other organizations shaping the lands and waters of the Southeast.
			</li>
		</ul>
	</section>

	<section>
		<h2>Basis for the goal numbers</h2>
		<p>
			The long-term goal is intended to be both ambitious and achievable. It is based on a synthesis
			of 13 assessments covering the Southeast (e.g., eBird, National Coastal Condition Assessments,
			America's Longleaf Range-wide Accomplishment Reports, etc.). The near-term goals identify
			minimum progress needed to stay on track with meeting the long-term goal.
		</p>
	</section>
</div>
