<script lang="ts">
	import QuestionIcon from '@lucide/svelte/icons/message-circle-question-mark'
	import { asset, resolve } from '$app/paths'
	import { Head, HeaderImage } from '$lib/components/layout'

	import HeroImage from '$images/hero/usfws-sunset-view-la-playuela-beach-cabo-rojo-puerto-rico.jpg?format=avif;webp;jpg&w=3200;1920;720&as=picture'
	const caption =
		'Sunset view at La Playuela beach Cabo Rojo, Puerto Rico. <a href="https://www.fws.gov/media/sunset-view-la-playuela-beach-cabo-rojo-puerto-rico" target="_blank">Photo</a> by <a href="https://www.fws.gov/staff-profile/jose-gilberto-martinez" target="_blank">Stephen Taylor</a>'
</script>

<Head
	title="Blueprint State Reports"
	description="Access state-level reports from the Southeast Conservation Blueprint."
	imageURL={HeroImage.img.src}
/>

<HeaderImage src={HeroImage} {caption} title="Blueprint State Reports" />

<div class="page-content py-12">
	<section>
		<h2>Blueprint 2025 state reports</h2>

		<p>
			The following reports summarize the Southeast Conservation Blueprint and related information
			at the state level:
		</p>

		<ul class="mt-2 list-disc pl-8">
			<li>
				<a href={asset('/pdf/state_reports/Alabama_Blueprint2025_report.pdf')} target="_blank"
					>Alabama</a
				>
			</li>
			<li>
				<a href={asset('/pdf/state_reports/Arkansas_Blueprint2025_report.pdf')} target="_blank"
					>Arkansas</a
				>
			</li>
			<li>
				<a href={asset('/pdf/state_reports/Florida_Blueprint2025_report.pdf')} target="_blank"
					>Florida</a
				>
			</li>
			<li>
				<a href={asset('/pdf/state_reports/Georgia_Blueprint2025_report.pdf')} target="_blank"
					>Georgia</a
				>
			</li>
			<li>
				<a href={asset('/pdf/state_reports/Kentucky_Blueprint2025_report.pdf')} target="_blank"
					>Kentucky</a
				>
			</li>
			<li>
				<a href={asset('/pdf/state_reports/Louisiana_Blueprint2025_report.pdf')} target="_blank"
					>Louisiana</a
				>
			</li>
			<li>
				<a href={asset('/pdf/state_reports/Mississippi_Blueprint2025_report.pdf')} target="_blank"
					>Mississippi</a
				>
			</li>
			<li>
				<a href={asset('/pdf/state_reports/Missouri_Blueprint2025_report.pdf')} target="_blank"
					>Missouri</a
				>
			</li>
			<li>
				<a
					href={asset('/pdf/state_reports/North_Carolina_Blueprint2025_report.pdf')}
					target="_blank">North Carolina</a
				>
			</li>
			<li>
				<a href={asset('/pdf/state_reports/Oklahoma_Blueprint2025_report.pdf')} target="_blank"
					>Oklahoma</a
				>
			</li>
			<li>
				<a href={asset('/pdf/state_reports/Puerto_Rico_Blueprint2025_report.pdf')} target="_blank"
					>Puerto Rico</a
				>
			</li>
			<li>
				<a
					href={asset('/pdf/state_reports/South_Carolina_Blueprint2025_report.pdf')}
					target="_blank">South Carolina</a
				>
			</li>
			<li>
				<a href={asset('/pdf/state_reports/Tennessee_Blueprint2025_report.pdf')} target="_blank"
					>Tennessee</a
				>
			</li>
			<li>
				<a href={asset('/pdf/state_reports/Texas_Blueprint2025_report.pdf')} target="_blank"
					>Texas</a
				>
			</li>
			<li>
				<a
					href={asset('/pdf/state_reports/United_States_Virgin_Islands_Blueprint2025_report.pdf')}
					target="_blank">U.S. Virgin Islands</a
				>
			</li>
			<li>
				<a href={asset('/pdf/state_reports/Virginia_Blueprint2025_report.pdf')} target="_blank"
					>Virginia</a
				>
			</li>
			<li>
				<a href={asset('/pdf/state_reports/West_Virginia_Blueprint2025_report.pdf')} target="_blank"
					>West Virginia</a
				>
			</li>
		</ul>
	</section>

	<section>
		<h3>Learn more</h3>
		<p class="mt-2">
			You can visit the
			<a href={resolve('/blueprint/')}>Blueprint page</a> to learn more about the Southeast
			Conservation Blueprint.

			<br /><br />
			You can also explore the Blueprint and create custom reports in the
			<a href="https://apps.fws.gov/southeastblueprint/" target="_blank"
				>Southeast Conservation Blueprint Explorer</a
			>.
			<br /><br />
			Or you can dig deeper into the Blueprint on the

			<a href="https://secas-fws.hub.arcgis.com/pages/blueprint" target="_blank"> SECAS Atlas</a>.

			<br /><br />
			Or you can <a href={resolve('/blueprint-data-download')}>download the GIS data</a> for further analysis.
		</p>

		<div class="mt-12 flex items-center gap-4 rounded-lg bg-blue-1/50 px-4 py-2 text-lg">
			<b>
				<QuestionIcon class="size-12 text-muted-foreground/80" />
			</b>
			<p>
				<b>Not sure where to start?</b>
				<br />
				Reach out to <a href={resolve('/staff/')}>SECAS staff</a> and we'll be happy to help you get going!
			</p>
		</div>
	</section>
</div>
