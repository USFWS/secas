<script lang="ts">
	import { asset, resolve } from '$app/paths'
	import { Head, HeaderImage } from '$lib/components/layout'
	import { groupBy } from '$lib/util/data'

	import SteeringCommitteeMembers from './steering_committee.csv'
	import POCs from './pocs.csv'

	import HeroImage from '$images/hero/cape-lookout-lighthouse.jpg?format=avif;webp;jpg&w=3200;1920;720&as=picture'
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
			) as Record<string, Contact[]>
		])
	)
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
			The SECAS Executive Steering Committee is an official joint party <a
				href="https://seafwa.org/committee/secas"
				target="_blank">committee</a
			>
			of the Southeastern Association of Fish and Wildlife Agencies (SEAFWA). It provides overall
			leadership, direction, and resources to the SECAS partnership. It is composed of five SEAFWA
			state directors appointed by the SEAFWA president. It also includes the U.S. Fish and Wildlife
			Service Southeast Regional Director as a standing member to represent the Service's landscape
			conservation priorities and serve as a liaison to federal agencies in the Southeast Natural
			Resources Leaders Group. Learn more about the Executive Steering Committee in the
			<a href={asset('/pdf/SECAS_Charter_FINAL_10-18-23.pdf')} target="_blank"
				>official SECAS charter</a
			>
			and
			<a href={asset('/pdf/SECAS_Org_Structure_2021.pdf')} target="_blank">
				SECAS organizational structure
			</a>.
		</p>
		<h4 class="mt-6">Executive Steering Committee Members:</h4>
		<ul class="mt-4 pl-0 [&_li]:not-first-of-type:mt-8">
			{#each SteeringCommitteeMembers as { name, title, photo, notes, chair } (name)}
				<li class="grid grid-cols-[80px_1fr] gap-2 md:gap-4 md:grid-cols-[125px_1fr]">
					<div>
						{#if photo}
							<img src={asset(`/images/${photo}`)} alt={name} class="mt-1" />
						{/if}
					</div>
					<div>
						<div class="text-lg font-bold">
							{name}{JSON.parse(chair) ? ' (Chair)' : ''}
						</div>
						<div class="italic">
							{title}
						</div>
						{#if notes}
							<div class="mt-1 md:mt-4 text-sm text-muted-foreground">{notes}</div>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	</section>

	<section>
		<h2>SECAS Points of Contact (POCs)</h2>
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
								{#if name === 'vacant'}
									<div class="text-muted-foreground italic">vacant</div>
								{:else}
									<div>
										<a href={`mailto:${email}`} target="_blank">
											{name}
										</a>{#if title}, <span class="text-foreground/90 italic">{title}</span>{/if}
									</div>
								{/if}
							{/each}
						</li>
					{/each}
				</ul>
			{/each}
		</div>
	</section>

	<section>
		<h2>Lead Coordination Team</h2>
		<p>
			The Lead Coordination Team serves as an advisory think tank for SECAS. This group of invited
			conservation leaders meets monthly to provide feedback on emerging initiatives, serving as a
			sounding board for staff to help shape early ideas.
		</p>
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
