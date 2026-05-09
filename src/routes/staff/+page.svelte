<script lang="ts">
	import QuestionIcon from '@lucide/svelte/icons/message-circle-question-mark'
	import { Head, HeaderImage } from '$lib/components/layout'
	import { StaffItem } from '$lib/components/elements'

	import HeroImage from '$lib/assets/images/hero/canoeing-alligator-river-nationa-wildlife-refuge.jpg?format=avif;webp;jpg&w=3200;1920;720&as=picture'
	const caption =
		'<a href="http://www.fws.gov/refuge/alligator_river/" target="_blank">Alligator River National Wildlife Refuge</a>. Photo by Steve Hillebrand, USFWS.'

	import AdamMalcombProfile from '$lib/assets/images/AdamMalcomb_150p.jpg'
	import AlexLamleProfile from '$lib/assets/images/AlexLamle2_150p.jpg'
	import AmyKeisterProfile from '$lib/assets/images/AmyKeister_150p.jpg'
	import HilaryMorrisProfile from '$lib/assets/images/HilaryMorris_3_150p.jpg'
	import LouiseVaughnProfile from '$lib/assets/images/LouiseVaughn_150p.jpg'
	import RuaMordecaiProfile from '$lib/assets/images/RuaMordecai_new_150p.jpg'
</script>

<HeaderImage src={HeroImage} {caption} title="SECAS Staff" />

<Head title="Staff" description="Get in touch with SECAS staff." imageURL={HeroImage.img.src} />

<div class="page-content py-12">
	<section>
		<h2>Coordination</h2>
		<p>
			The SECAS Coordinator and Science Coordinator help keep the SECAS partnership and its products
			on track.
		</p>
		<StaffItem
			name="Rua Mordecai"
			title="Science Coordinator & Interim Coordinator"
			email="rua_mordecai@fws.gov"
			img={RuaMordecaiProfile}
			class="mt-6"
		>
			Rua is based in Raleigh, NC. He coordinates the Southeast Conservation Blueprint and takes the
			lead on tracking progress toward the SECAS goal. He works closely with the SECAS Points of
			Contact, as well as all the staff and partners working on the Southeast Blueprint. While the
			SECAS Coordinator position is vacant, he also helps set the overall strategic direction for
			SECAS and clear barriers to landscape-scale collaboration, working closely with the SECAS
			Executive Steering Committee.
		</StaffItem>
	</section>

	<hr />

	<section>
		<h2>Blueprint User Support</h2>
		<p>
			Have a question about the Blueprint, or want to use it in your work to support a grant
			proposal or inform a conservation decision? User support staff are here to help (for free)!
			They also help incorporate your feedback into future Blueprint revisions and improve the
			online interfaces for accessing Blueprint data.
		</p>

		<StaffItem
			name="Alex Lamle"
			title="Blueprint User Support Specialist"
			email="alexandria_lamle@fws.gov"
			img={AlexLamleProfile}
			class="mt-6"
		>
			Alex is based in Atlanta, GA. She has experience helping with aquatic connectivity and river
			restoration, urban conservation, and prescribed fire.
			<br /><br />
			<b>States/territories served:</b> GA, AL, MS, TX, OK, Puerto Rico, U.S. Virgin Islands
		</StaffItem>

		<StaffItem
			name="Hilary Morris"
			title="Blueprint User Support & Communications Specialist"
			email="hilary_morris@fws.gov"
			img={HilaryMorrisProfile}
		>
			Hilary is based in Raleigh, NC. She coordinates communications for SECAS, which involves
			everything from managing the website and newsletter, to documenting Blueprint methods. On the
			user support side, she has experience helping with strengthening grant applications, public
			lands planning, conservation partnerships, and city/county planning.
			<br /><br />
			<b>States served:</b> VA, NC, SC, GA
		</StaffItem>

		<StaffItem
			name="Louise Vaughn"
			title="Blueprint User Support Specialist"
			email="louise_vaughn@fws.gov"
			img={LouiseVaughnProfile}
		>
			Louise is based in Raleigh, NC. She has experience helping with facilitation, conservation
			planning, and conservation partnerships at regional, state, and local scales. Louise also
			works to integrate green assets and nature-based solutions to support community resiliency.
			<br /><br />
			<b>States/territories served:</b> NC, FL, Puerto Rico, U.S. Virgin Islands
		</StaffItem>

		<StaffItem
			name="Adam Malcomb"
			title="Blueprint User Support Specialist"
			email="adam_malcomb@fws.gov"
			img={AdamMalcombProfile}
		>
			Adam is based in Lafayette, LA and is a great first stop if you're not sure who to talk to! He
			has experience in conservation planning for private land habitat restoration and enhancement,
			longleaf pine management, environmental evaluation, tribal communications, cartography, and
			conservation partnerships.
			<br /><br />
			<b>States served:</b> LA, AR, MO, WV, TN, KY
		</StaffItem>

		<div class="mt-12 flex items-center gap-4 rounded-lg bg-blue-1 px-4 py-2 text-lg">
			<b>
				<QuestionIcon class="size-12 text-muted-foreground/80" />
			</b>
			<p>
				<b>Not sure who to contact?</b>
				<br />
				Start with Adam at
				<a href="mailto:adam_malcomb@fws.gov" target="_blank">adam_malcomb@fws.gov</a> and he'll put you
				in touch with the best person to help.
			</p>
		</div>
	</section>

	<hr />

	<section>
		<h2>Blueprint GIS Staff</h2>

		<p>
			Blueprint GIS support staff work to improve the underlying spatial data and methods of the
			Southeast Blueprint. They develop and test indicators of ecosystem health, refine the
			Blueprint connectivity analysis, run the Blueprint prioritization models, and more.
		</p>

		<StaffItem
			name="Amy Keister"
			title="Blueprint GIS Specialist"
			email="amy_keister@fws.gov"
			img={AmyKeisterProfile}
			class="mt-6"
		>
			Amy is based in Raleigh, NC. She helps coordinate the underlying spatial data, modeling, and
			data management for the Southeast Blueprint, and works to develop and improve the underlying
			data and methods. She also assists with data anlaysis for Blueprint user support.
		</StaffItem>
	</section>
</div>
