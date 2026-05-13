<script lang="ts">
	import { asset, resolve } from '$app/paths'
	import { Head, HeaderImage } from '$lib/components/layout'

	import HeroImage from '$lib/assets/images/banner/cape-lookout-lighthouse.jpg?format=avif;webp;jpg&w=3200;1920;720&as=picture'
	const caption =
		'<a href="https://flic.kr/p/aiCPu1" target="_blank">Cape Lookout lighthouse and sea oats</a>, North Carolina. Photo by Zach Frailey, <a href="https://creativecommons.org/licenses/by-nc-nd/2.0/" target="_blank">CC BY-NC-ND 2.0</a>.'
</script>

<Head
	title="Committees and teams"
	description="Learn more about SECAS committees and teams."
	imageURL={HeroImage.img.src}
/>

<HeaderImage src={HeroImage} {caption} title="Committees & Teams" />

<div class="page-content py-12">
	<section>
		<h2>SECAS Executive Steering Committee</h2>
		<p>
			The Executive Steering Committee provides overall leadership, direction, and resources to the
			SECAS partnership. It is composed of five Southeastern Association of Fish and Wildlife
			Agencies (SEAFWA) state directors appointed by the SEAFWA president. It also U.S. Fish and
			Wildlife Service Southeast Regional Director as a standing member to represent the Service's
			landscape conservation priorities and serve as a liason to federal agencies in the Southeast
			Natural Resources Leaders Group. Learn more about the Executive Steering Committee in the <a
				href={asset('/pdf/SECAS_Charter_FINAL_10-18-23.pdf')}
				target="_blank">official SECAS charter</a
			>
			and
			<a href={asset('/pdf/SECAS_Org_Structure_2021.pdf')} target="_blank">
				SECAS organizational structure
			</a>.
			<br /><br />
			Executive Steering Committee Members:
		</p>
		<ul class="mt-2 list-disc pl-8 [&_li]:not-first-of-type:mt-2">
			<li>
				<b>Louisiana:</b> Duck Locascio, <i>Forestry Program Manager, Department of Wildlife</i>
				and Fisheries.
				<div class="text-sm text-muted-foreground">
					(Duck Locascio serves on behalf of Tyler Bosworth, <i>
						Secretary, Louisiana Department of Wildlife and Fisheries
					</i>)
				</div>
			</li>
			<li>
				<b>Missouri:</b> Jason Sumners, <i>Director, Department of Conservation</i>
			</li>
			<li>
				<b>North Carolina:</b> Kyle Briggs, <i>Executive Director, Wildlife Resources Commission</i>
			</li>
			<li>
				<b>U.S. Virgin Islands:</b> Director,
				<i>Division of Fish and Wildlife, Department of Planning and Natural Resources</i>
			</li>
			<li>
				<b>West Virginia:</b> Paul Johansen,
				<i>Chief, Wildlife Resources Section, Division of Natural Resources</i>
			</li>
			<li>
				<b>U.S. Fish and Wildlife Service:</b> Mike Oetker,
				<i>Southeast Regional Director, Interior Regions 2 & 4</i>
			</li>
		</ul>

		<p class="mt-6">
			Each Executive Steering Committee member appoints one or more points of contact. See the <a
				href={resolve('/partners/')}>partners page</a
			> for more information.
		</p>
	</section>
</div>
