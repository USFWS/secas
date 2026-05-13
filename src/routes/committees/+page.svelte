<script lang="ts">
	import { asset, resolve } from '$app/paths'
	import { Head, HeaderImage } from '$lib/components/layout'
	import { groupBy } from '$lib/util/data'

	import POCs from './pocs.csv'

	import HeroImage from '$lib/assets/images/banner/cape-lookout-lighthouse.jpg?format=avif;webp;jpg&w=3200;1920;720&as=picture'
	const caption =
		'<a href="https://flic.kr/p/aiCPu1" target="_blank">Cape Lookout lighthouse and sea oats</a>, North Carolina. Photo by Zach Frailey, <a href="https://creativecommons.org/licenses/by-nc-nd/2.0/" target="_blank">CC BY-NC-ND 2.0</a>.'

	type Contact = {
		name: string
		email: string
		title: string
		organization: string
	}

	const contacts = Object.fromEntries(
		Object.entries(groupBy(POCs as Contact[], 'orgtype')).map(([orgType, items]) => [
			orgType,
			Object.fromEntries(
				Object.entries(groupBy(items, 'organization')).sort(([orgA], [orgB]) =>
					orgA < orgB ? -1 : 1
				)
			)
		])
	)

	console.log('contacts', contacts)
</script>

<Head
	title="Committees and teams"
	description="Learn more about SECAS committees and teams."
	imageURL={HeroImage.img.src}
/>

<HeaderImage src={HeroImage} {caption} title="Committees & Teams" />

<div
	class="page-content py-12 [&_section]:not-first-of-type:mt-6 [&_section]:not-first-of-type:border-t [&_section]:not-first-of-type:border-t-grey-2 [&_section]:not-first-of-type:pt-6"
>
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

	<section>
		<h2>Partner Organization Points of Contact</h2>
		<p>
			The following individuals serve as representatives of state fish and wildlife agencies/SEAFWA
			Directors, federal agencies with natural resource authorities and responsibilities in the
			Southeast/SENRLG Principals, and a handful of nonprofit organizations. They meet quarterly and
			provide input on more technical decisions based on the strategic guidance of the Steering
			Committee.
		</p>

		<div class="mt-4 [&_h4]:not-first:mt-8 [&_li]:not-first-of-type:mt-3">
			{#each Object.entries(contacts) as [orgtype, organizations] (orgtype)}
				<h4>{orgtype}</h4>
				<ul>
					{#each Object.entries(organizations) as [organization, orgContacts] (organization)}
						<li>
							<div class="leading-tight font-bold">{organization}:</div>
							{#each orgContacts as { name, email, title } (email)}
								<div>
									<a href={`mailto:${email}`} target="_blank">
										{name}
									</a>{#if title}, <span class="text-foreground/90 italic">{title}</span>{/if}
								</div>
							{/each}
						</li>
					{/each}
				</ul>
			{/each}
		</div>
	</section>

	<section>
		<h2>Lead Coordination Team</h2>
		<p>This team ...</p>
	</section>

	<section>
		<h2>Ad Hoc Teams</h2>
		<p>
			As we develop or improve products or wrestle with challenging decisions, SECAS periodically
			spins up small teams to provide input. A common example of this is indicator teams to refine
			or create a new indicator in the Blueprint. Opportunities to join ad hoc teams are advertised
			in the newsletter. Subscribe to our email list to ensure you never miss an opportunity to
			contribute!
		</p>
	</section>
</div>
