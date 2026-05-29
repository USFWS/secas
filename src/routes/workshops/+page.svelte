<script lang="ts">
	import WarningIcon from '@lucide/svelte/icons/triangle-alert'
	import { resolve } from '$app/paths'
	import { Head, HeaderImage } from '$lib/components/layout'
	import * as Alert from '$lib/components/ui/alert'

	import HeroImage from '$images/hero/SouthAtlanticBlueprint2_2_workshop.jpg?format=avif;webp;jpg&w=3200;1920;720&as=picture'
	const caption = 'South Atlantic Blueprint 2.2 Workshop'

	import Workshops from './workshops.csv'
</script>

<Head
	title="Southeast Conservation Blueprint Workshops"
	description="Help improve the Southeast Conservation Blueprint by participating in a workshop!"
	imageURL={HeroImage.img.src}
/>

<HeaderImage
	src={HeroImage}
	{caption}
	title="Southeast Conservation Blueprint Workshops"
	class="[&>div]:mt-0"
/>

<div class="page-content py-12">
	<h2>Blueprint workshops for 2024</h2>

	<!-- Hilary: comment/uncomment the following Alert block as needed -->
	<Alert.Root variant="destructive" class="mt-6 mb-12">
		<Alert.Title class="flex items-center gap-2 text-lg font-bold">
			<WarningIcon class="size-5" />
			Workshops are over for 2024</Alert.Title
		>
		<Alert.Description class="text-lg">
			We'll update this page in the future for the next workshop series!
		</Alert.Description>
	</Alert.Root>

	<h4 class="mt-6">Register for a workshop</h4>

	<div>
		<table
			cellpadding="0"
			cellspacing="0"
			class="mt-2 w-full border border-grey-4 [&_td]:px-4 [&_td]:py-2 [&_td]:last:text-right [&_th]:px-4 [&_th]:py-1 [&_th]:not-last:text-left [&_th]:last:text-right [&_tr]:not-first-of-type:border-t [&_tr]:not-first-of-type:border-t-grey-2"
		>
			<thead>
				<tr class="border-b bg-grey-1">
					<th class="w-24">Date</th>
					<th class="w-60">Time</th>
					<th>Subregions</th>
					<th>Registration link</th>
				</tr>
			</thead>
			<tbody>
				{#each Workshops as { date, time, area, registration_url } (`${date}-${time}-${area}`)}
					<tr class="even:bg-grey-0">
						<td>{date}</td>
						<td>{time}</td>
						<td>{area}</td>
						<td>
							<a href={registration_url} target="_blank">Register via Zoom</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="mt-16">
		<h4>Background</h4>
		<p>
			The Southeast Conservation Adaptation Strategy (SECAS) is a regional conservation initiative
			that spans the Southeastern United States and Caribbean. The primary product of SECAS is the
			Southeast Conservation Blueprint, a living, spatial plan that identifies priority areas for a
			connected network of lands and waters across the region. We regularly update the Blueprint
			based on new data and feedback from the conservation community. In 2024, the Blueprint update
			focuses on the continental Southeast geography. It uses refined prioritization methods and
			incorporates a number of new and improved indicators for inland and marine areas. <b
				>We need your feedback on the final Blueprint!</b
			>
			Your input helps to ensure the Blueprint represents on-the-ground conditions and captures your conservation
			priorities. It also helps staff prioritize future improvements.
			<br /><br />
			In October and November, we are hosting a series of 1.5-hour workshops via Zoom to review Blueprint
			2024. Based on feedback from past attendees, we’ve changed the timing of workshops this year, so
			you’ll be reviewing the final version of instead of a draft. This means your feedback will start
			shaping the 2025 Blueprint update. You will be able to zoom in on areas that you know and provide
			spatially explicit feedback on the draft Blueprint, capturing places that are underprioritized,
			overprioritized, and that you have questions about. Please note, some workshops are repeated to
			account for scheduling conflicts--_please only register for one workshop for a given area (the content
			will be the same in both)_. But if you want to attend workshops for different areas, feel free to
			register for more than one! Click on a registration link in the table below to sign up to attend.
		</p>
	</div>

	<h4 class="mt-12">More resources</h4>
	<ul>
		<li>
			For more information about what changes you can expect to see with the 2024 update to the
			Southeast Blueprint, <a
				href={resolve('/2024/03/26/The-plan-for-the-2024-Southeast-Conservation-Blueprint/')}
				>take a look at this blog</a
			> by SECAS Science Coordinator, Rua Mordecai.
		</li>
		<li>
			To learn about the new approach for balancing priorities across subregions in Blueprint 2024, <a
				href={resolve('/2024/06/26/Balancing-priorities-across-subregions-in-Blueprint-2024/')}
				>read this blog</a
			> by Blueprint User Support and Communications Specialist, Hilary Morris.
		</li>
		<li>
			Curious why SECAS staff changed the timing of workshops this year to review the final
			Blueprint instead of a draft? <a
				href={resolve('/2024/07/15/save-the-date-for-Blueprint-2024-virtual-workshops-in-Oct-Nov')}
				>Another of Hilary's blogs</a
			> explains the reasoning.
		</li>
		<li>
			Would you like more information about the history of the Blueprint and how it is developed? <a
				href={resolve('/blueprint/')}>Explore the Blueprint page of the SECAS website</a
			>
			or reach out to
			<a href={resolve('/staff/')}>Blueprint User Support staff in your area</a>.
		</li>
		<li>
			Have questions about the workshops? Contact <a
				href="mailto:hilary_morris@fws.gov"
				target="_blank">hilary_morris@fws.gov</a
			>.
		</li>
		<li>
			Unable to attend any of the scheduled workshops? Reach out to one of <a
				href={resolve('/staff/')}>our Blueprint User Support staff</a
			> to arrange an alternative way to provide feedback.
		</li>
	</ul>
</div>
