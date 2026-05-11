<script lang="ts">
	import { Head, HeaderImage } from '$lib/components/layout'

	import HeroImage from '$lib/assets/images/hero/grays-reef-national-marine-sanctuary.jpg?format=avif;webp;jpg&w=3200;1920;720&as=picture'
	const caption =
		'Diving at Gray’s Reef National Marine Sanctuary, Savannah, Georgia. <a href="https://flic.kr/p/HqZMnT" target="_blank">Photo</a> by Greg McFall, NOAA.'
</script>

<Head
	title="Events"
	description="Learn about upcoming SECAS events."
	imageURL={HeroImage.img.src}
/>

<HeaderImage src={HeroImage} {caption} title="Events" />

<div class="page-content">
	<h2 class="mt-12 text-center">SECAS Events Calendar</h2>
	<iframe
		src="https://calendar.google.com/calendar/embed?src=secassoutheast%40gmail.com&ctz=America%2FNew_York"
		title="SECAS calendar"
		frameborder="0"
		scrolling="no"
		class="mt-2 h-[600px] w-full border border-grey-4"
	></iframe>

	<p class="mt-12">
		Looking for recordings of past Third Thursday Web Forums? They're available
		<a
			href="https://www.youtube.com/playlist?list=PLiK5DRAthv5gDCbmwwPPsqkPkEHkOL6Gb"
			target="_blank">in this YouTube playlist</a
		>.
	</p>
</div>
