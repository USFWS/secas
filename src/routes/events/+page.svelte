<script lang="ts">
	import { resolve } from '$app/paths'
	import { Head, HeaderImage } from '$lib/components/layout'

	import HeroImage from '$images/hero/grays-reef-national-marine-sanctuary.jpg?format=avif;jpg&w=3200;1600;800&as=picture'
	const caption =
		'Diving at Gray’s Reef National Marine Sanctuary, Savannah, Georgia. <a href="https://flic.kr/p/HqZMnT" target="_blank">Photo</a> by Greg McFall, NOAA.'
</script>

<Head
	title="Events"
	description="Learn about upcoming SECAS events."
	imageURL={HeroImage.img.src}
/>

<HeaderImage src={HeroImage} {caption} title="Events" />

<div class="page-content py-12">
	<section>
		<p class="text-lg">
			SECAS staff and partners regularly host events so that you can learn more about conservation
			activities and progress in the region, get involved in Blueprint development, and connect with
			folks. Check out the calendar below for upcoming events. These regular events include:
		</p>
		<div
			class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4 [&_h4]:leading-tight [&_p]:mt-2 md:[&>div]:not-first:border-l md:[&>div]:not-first:border-l-grey-2 md:[&>div]:not-first:pl-4"
		>
			<div>
				<h4>Third Thursday Web Forum</h4>
				<p>
					SECAS hosts this webinar series on the third Thursday of every month at 10 am ET. It
					features emerging science and success stories relevant to landscape-scale conservation and
					offers a chance for staff to share updates and seek feedback on SECAS products.
					<br /><br />
					Looking for recordings of past Third Thursday Web Forums? They're available
					<a
						href="https://www.youtube.com/playlist?list=PLiK5DRAthv5gDCbmwwPPsqkPkEHkOL6Gb"
						target="_blank">in this YouTube playlist</a
					>.
				</p>
			</div>

			<div>
				<h4>Climate & Conservation Coffee</h4>
				<div class="text-sm text-muted-foreground">(Raleigh, NC area)</div>
				<p>
					SECAS and the Southeast Climate Adaptation Science Center co-host this informal monthly
					event for partners working in landscape-scale conservation and climate adaptation in the
					Raleigh, NC area. It alternates between an in-person and virtual format. <a
						href="https://docs.google.com/forms/d/e/1FAIpQLSe1keFtZPrAxJ3fPagAoxqpJbz38CCHgOD-omUuXr-TpQxA-A/viewform?usp=dialog"
						target="_blank">Fill out this short form</a
					> to receive a reminder email about this event.
				</p>
			</div>

			<div>
				<h4>Blueprint Workshops</h4>
				<p>
					Blueprint workshops are your way to get involved with development and review of the
					Blueprint and provide your valuable feedback!
					<br /><br />
					Blueprint workshops are not currently happening right now, but when they are, we'll post something
					here.

					<!-- Hilary: enable the link to the workshops page here: -->
					<br /><br />
					<a href={resolve('/workshops/')}>Register for a workshop</a>.
				</p>
			</div>
		</div>
	</section>

	<section>
		<h4 class="mt-16 border-t border-t-grey-5 bg-grey-1 py-4 text-center">SECAS Events Calendar</h4>

		<iframe
			src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&showPrint=0&title=SECAS%20Event%20Calendar&mode=AGENDA&src=c2VjYXNzb3V0aGVhc3RAZ21haWwuY29t&color=%23039be5"
			title="SECAS calendar"
			frameborder="0"
			scrolling="no"
			class="h-[600px] w-full border border-grey-4"
		></iframe>
	</section>
</div>
