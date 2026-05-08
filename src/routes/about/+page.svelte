<script lang="ts">
	import { asset, resolve } from '$app/paths'
	import { HeaderImage } from '$lib/components/layout'
	import { Button } from '$lib/components/ui/button'

	// import HeroImage from '$lib/assets/images/hero/gulf-side-lower-suwanee-national-wildlife-refuge.jpg?format=avif;webp;jpg&w=4800;3200;1920;720&as=picture'
	import HeroImage from '$lib/assets/images/hero/gulf-side-lower-suwanee-national-wildlife-refuge.jpg'
	const caption =
		'<a href="http://www.fws.gov/refuge/lower_suwannee/" target="_blank">Lower Suwanee National Wildlife Refuge</a>. Photo by George Willson.'
</script>

<HeaderImage src={HeroImage} {caption} title="About SECAS" imageClass="brightness-85" />

<div class="page-content py-12">
	<section>
		<h2>
			SECAS is a regional conservation initiative that spans the Southeastern United States and
			Caribbean.
		</h2>
		<p class="text-lg">
			SECAS was started in 2011 by the states of the <a href="https://seafwa.org/" target="_blank"
				>Southeastern Association of Fish and Wildlife Agencies</a
			>
			and the federal agencies with natural resource management responsibilities and authorities in the
			Southeast. SECAS emerged as a response to the unprecedented challenges facing our natural and cultural
			resources, like urban growth and climate change. We see these challenges as an opportunity to coordinate
			conservation action and investment around a shared strategy. To learn more,
			<a href={asset('/pdf/SECAS_final_Purpose_Statement_approved_5-24-2021.pdf')} target="_blank"
				>read our statement of shared purpose</a
			>.
		</p>
	</section>

	<section>
		<h2>What we do</h2>
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-[4fr_1fr]">
			<div>
				<p>
					SECAS brings together state and federal agencies, nonprofit organizations, private
					landowners and businesses, Tribes, partnerships, and universities around a shared vision
					of the future. We're working to design and achieve a connected network of lands and waters
					to benefit ecosystems, species, and people.
					<br /><br />
					SECAS tracks regional metrics of ecosystem health, function, and connectivity to report annually
					on progress toward achieving <a href={resolve('/our-goal/')}>the SECAS 10% goal</a>.
					<br /><br />
					SECAS develops <a href={resolve('/blueprint/')}>the Southeast Conservation Blueprint</a>,
					a living, spatial plan to achieve the SECAS vision and goal. More than 500 people from
					over 200 organizations have used or are using the Blueprint in their work.
					<a href={resolve('/story-map/')}>Visit the SECAS in Action story map</a> to explore in-depth
					examples of how the Blueprint and the broader SECAS partnership are making a difference on the
					ground.
				</p>
				<Button
					variant="secondary"
					size="lg"
					href={asset('/pdf/SECASFactsheet_12-1-2025_web_sm.pdf')}
					target="_blank"
					class="mt-6 w-full no-underline"
				>
					View the SECAS factsheet
				</Button>
			</div>
			<div>
				<figure class="mt-1 hidden lg:block">
					<enhanced:img
						src="$lib/assets/images/ChassohowitzkaNWR_aerial_FL_JoyceKleen_USFWS_cropped.jpg"
						alt="Chassahowitzka National Wildlife Refuge in Florida"
						class="max-w-[300px]"
					/>
					<figcaption>
						<a
							href="https://www.fws.gov/media/chassahowitzka-national-wildlife-refuge-florida"
							target="_blank">Chassahowitzka National Wildlife Refuge</a
						>, in Florida. Photo by Joyce Kleen/USFWS.
					</figcaption>
				</figure>
			</div>
		</div>
	</section>

	<section>
		<h2>Where we work</h2>
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
			<p>
				The Southeast United States is a cradle of biodiversity and home to some of the strongest
				conservation collaboration in the nation. 90% of the land is privately owned and private
				landowners play a significant role in defining the conservation future of the region. The
				Southeast also has a rich cultural heritage including the current and ancestral lands of
				indigenous Tribes and other communities like the Gullah Geechee people.
			</p>

			<figure class="mt-2">
				<enhanced:img
					src="$lib/assets/images/SECAS_Geography_Map_2025.png"
					alt="Map of the SECAS geography outlining 15 states of the Southeast, Puerto Rico, U.S. Virgin Islands, and the offshore marine environment in green"
					class="border border-grey-4"
				/>
				<figcaption>The SECAS geography.</figcaption>
			</figure>
		</div>
	</section>

	<section>
		<h2>The need for SECAS</h2>
		<p>
			The dramatic changes sweeping the Southeastern United States pose unprecedented challenges for
			sustaining our natural and cultural resources:
		</p>
		<ul class="mt-2 list-disc pl-8">
			<li>
				More than 89 million people call the Southeastern United States home. The region’s
				population has grown roughly 40% faster than any other part of the country over the past six
				decades.
			</li>
			<li>
				If current trends continue, research predicts that urban areas in the Southeast may double
				in size by 2060, creating a mega-city connecting Raleigh to Atlanta.
			</li>
			<li>
				This rapid growth comes at the expense of fish and wildlife habitat, working lands, and the
				rural character of our region. By the year 2060, studies predict a loss of forest lands
				equal to the size of South Carolina (23 million acres).
			</li>
			<li>
				Sea-level rise is also contributing to coastal land loss, taking away marshes that provide
				nature’s best storm protection and threatening the Gulf Coast economy, which is highly
				intertwined with its natural resource base and provides 1/3 of the nation’s seafood.
			</li>
		</ul>
		<div class="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
			<figure class="mt-1 hidden lg:block">
				<enhanced:img
					src="$lib/assets/images/hurricane_laura_cropped.jpg"
					alt=""
					class="border border-grey-4"
				/>
			</figure>

			<p>
				These changes affect not only our natural world, but also our quality of life and economic
				well-being. We rely on healthy ecosystems and the benefits they provide society, including
				clean and plentiful drinking water, outdoor recreation opportunities, protection of life and
				property, and other resources critical to industry. Wildlife- and fish-dependent recreation
				alone generates an estimated $20 billion in economic activity annually in the Southeast.
				<br /><br />
				These challenges are too big for any one organization to overcome alone, but they offer a clear
				opportunity to rally around a shared plan. Through SECAS, conservation partners from every sector
				are making a collective impact to sustain our natural and cultural resources into a changing future.
			</p>
		</div>
	</section>

	<section
		class="[&_div]:border-t-grey-1 [&_div]:pb-4 [&_div]:not-first-of-type:border-t [&_div]:not-first-of-type:pt-4 [&_h4]:border-l-8 [&_h4]:border-blue-8 [&_h4]:pl-3 [&_p]:pl-5"
	>
		<h2>The history of SECAS</h2>
		<div>
			<h4>2011</h4>
			<p>
				SECAS was initiated by the Association of Fish and Wildlife Agencies (SEAFWA) back in Fall
				2011. SEAFWA recognized the need to rally conservation partners around a common vision for
				sustaining natural resources in the Southeast through 2060. Ed Carter, the Executive
				Director of Tennessee Wildlife Resources Agency, and Cindy Dohner, Southeast Regional
				Director of the U.S. Fish and Wildlife Service, were strong early champions for SECAS. In
				May 2012, Mr. Carter invited the Southeast Natural Resource Leaders Group (SENRLG) to help
				lead SECAS. SENRLG agreed, establishing an early governance structure made up of SEAFWA
				Directors and SENRLG Principals. Together, these SECAS leaders represented the state and
				federal agencies working on natural resources issues in the Southeast region. Each SEAFWA
				Director and SENRLG Principal also chose a Point of Contact from their organization to
				participate in more detailed discussions and provide a complementary “bottom-up” governance
				framework.
			</p>
		</div>

		<div>
			<h4>2013</h4>
			<p>
				In Fall 2013, SECAS leadership set a goal of developing a first-generation Southeast
				Blueprint for landscape-scale conservation by the fall of 2016. Many different conservation
				planning efforts were already underway, but most eco-regional plans only covered parts of
				states, while state-specific plans stopped at the state line. The results of all this
				parallel planning did not yet add up to an integrated regional strategy.
			</p>
		</div>

		<div>
			<h4>2015</h4>
			<p>
				To help advance progress on the Blueprint and other landscape-scale conservation efforts,
				the Southeast Climate Adaptation Science Center funded the Vital Futures project. Vital
				Futures directly supported SECAS by assessing the implications of climate change and other
				drivers of landscape change for existing conservation goals and management objectives.
				<br /><br />
				At the Fall 2015 SEAFWA annual conference, the first ever SECAS symposium provided a status update
				on progress toward developing the Blueprint.
			</p>
		</div>

		<div>
			<h4>2016</h4>
			<p>
				A year later, Version 1.0 of the Southeast Blueprint was first introduced at a SECAS summit
				at the Fall 2016 SEAFWA annual conference. The summit inspired so much enthusiasm that the
				meeting space was standing room only, with people lined up in the doorway trying to catch a
				glimpse! Development of this first Blueprint relied heavily on Landscape Conservation
				Cooperatives (LCCs) across the Southeast and Caribbean and the diverse public and private
				organizations participating. The involvement in LCCs of regional partnerships like the
				Southeast Aquatic Resources Partnership (SARP) was particularly important in integrating
				products and planning across LCC boundaries. This plan provided the first ever integration
				of spatial plans developed through the South Atlantic, Appalachian, Gulf Coastal Plains and
				Ozarks, Gulf Coast Prairie, North Atlantic, Peninsular Florida and Caribbean LCCs. It also
				included priorities from the Mississippi River Basin/Gulf Hypoxia Initiative spearheaded by
				seven LCCs (Appalachian, Eastern Tallgrass Prairie and Big Rivers, Great Plains, Gulf Coast
				Prairie, Gulf Coastal Plains and Ozarks, Plains and Prairie Potholes, and Upper Midwest and
				Great Lakes). Southeast Blueprint 1.0 was finalized and released in December 2016.
			</p>
		</div>

		<div>
			<h4>2017</h4>
			<p>
				At the Fall 2017 SEAFWA annual meeting, Version 2.0 of the Southeast Blueprint was released.
				This kicked off the annual process of updating SECAS products for the SEAFWA meeting every
				fall. Southeast Blueprint 2.0 incorporated the improved subregional Blueprints from several
				LCCs and established priority connections with western states through the Crucial Habitat
				Assessment Tool. Significant improvements over the first version included improved
				consistency across LCC boundaries, improved consistency in climate change response, and
				improved integration beyond the Southeast. The SEAFWA Directors also charged SECAS with
				establishing an overarching goal for the SECAS initiative. SECAS leadership and the Points
				of Contact had all recognized the need to identify a key objective to define what SECAS is
				working toward, and develop supporting near-term metrics to measure progress.
			</p>
		</div>

		<div>
			<h4>2018</h4>
			<p>
				A year later, at the Fall 2018 SEAFWA annual conference, both
				<a href={resolve('/our-goal/')}>the SECAS goal</a>
				and Version 3.0 of the Southeast Blueprint were unveiled. The goal was developed to be both ambitious
				and achievable—to galvanize meaningful landscape-scale change for natural and cultural resources,
				while also recognizing the need to be realistic in the face of significant threats from urban
				growth, climate change, and more. The long-term SECAS goal called for a 10% or greater improvement
				in the health, function, and connectivity of Southeastern ecosystems by 2060. The near-term metrics
				called for a 1% improvement in the health, function, and connectivity of Southeastern ecosystems,
				supported by a 1% increase in conservation actions within the Blueprint, every 4 years. Version
				3.0 of the Southeast Blueprint was released in February 2019 . It included full coverage of Texas,
				integrated threat layers covering the full Southeast, and the addition of a hubs and corridors
				layer covering part of the region.
				<br /><br />
				As an added challenge, the development of Blueprint 3.0 and the goal occurred during a time of
				transition for the LCC Network where the structure and function of some LCCs was changing. Despite
				these changes, the capacity and commitment to continue to support Blueprint users and improve
				the Southeast Blueprint remained strong.
			</p>
		</div>

		<div>
			<h4>2019</h4>
			<p>
				In 2019, SECAS supported an effort to identify a “Regional Species of Greatest Conservation
				Need” list from the large number of species collectively identified as priorities in the 15
				Southeastern State Wildlife Action Plans. These regional priority species are intended to
				provide greater clarity and focus for regional conservation and multi-state collaborations.
				<br /><br />
				That fall, the draft of Southeast Blueprint Version 4.0 was released at the SEAFWA annual conference.
				Improvements over the previous version included: corrected overprioritization in Texas, Oklahoma,
				and the mountains of West Virginia and Virginia; improved priorities in the Lower Mississippi
				Valley, Louisiana marshes, and the Southern Appalachians; updated inputs from Florida and the
				Middle South subregion; expanded marine coverage to include state and federal waters around Florida;
				and expanded hubs and corridors that covered all of Florida.
				<br /><br />
				At the same time, SECAS unveiled the first ever report on progress toward achieving the 10% goal,
				<i>
					<a href={asset('/pdf/SECAS-goal-report-2019.pdf')} target="_blank"
						>Recent trends in Southeastern ecosystems</a
					>
				</i>.
			</p>
		</div>

		<div>
			<h4>2020</h4>
			<p>
				In 2020, SECAS embarked on a holistic partnership assessment called the SECAS Futures
				Project. It found that SECAS provides value in two key ways: as a forum for regional
				collaboration and as a hub for decision support and science delivery. SECAS also added three
				new Points of Contact for nonprofit organizations, adding representation from The Nature
				Conservancy, the Open Space Institute, and the Southern Group of State Foresters. That fall,
				Southeast Blueprint Version 2020 was released at the SEAFWA annual conference. Improvements
				over the previous versions included: finer resolution and a more connected network of
				priorities in the inland South Atlantic subregion; updated data and a more consistent
				approach to cross-state prioritization in the Middle Southeast subregion; and better
				integration in areas of overlap between the South Atlantic Blueprint, Florida Blueprint, and
				Nature's Network design. The <a
					href={asset('/pdf/SECAS-goal-report-2020.pdf')}
					target="_blank">second annual report on progress toward achieving the 10% goal</a
				> was also released.
			</p>
		</div>

		<div>
			<h4>2021</h4>
			<p>
				In Spring 2021, the SEAFWA Directors established the SECAS Executive Steering Committee as
				an official committee of SEAFWA to provide oversight and strategic direction to the SECAS
				partnership, which was a priority recommendation from the SECAS Futures Project. The
				Steering Committee is made up of 5 State Directors and 1 Federal agency Regional Director.
				The regional associations in the Midwest (MAFWA) and the Northeast (NEAFWA) adopted a
				similar governance approach to advance landscape scale conservation initiatives in their
				regions. SECAS also implemented several other near-term recommendations from the SECAS
				Futures project, including creating a statement of shared purpose, making the SECAS
				Coordinator role a permanent full-time position, conducting succession planning for key
				staff and Steering Committee leadership, and initiating a Social Network Analysis of
				regional conservation partnerships to help guide deeper partner engagement.
				<br /><br />
				In the fall, Southeast Blueprint Version 2021 was released following the SEAFWA annual conference.
				Improvements over the previous versions included: updated and improved indicators, better incorporation
				of equity, deep-sea coral, fire, and important grasslands, and multiple connectivity improvements
				in the South Atlantic subregion, as well as correcting a scoring issue in the Middle Southeast
				subregion.
				<br /><br />
				The
				<a href={asset('/pdf/SECAS-goal-report-2021.pdf')} target="_blank"
					>third annual report on progress toward achieving the 10% goal</a
				> was also released.
			</p>
		</div>

		<div>
			<h4>2022</h4>
			<p>
				In Fall 2022, Southeast Blueprint Version 2022 was released at the SEAFWA annual conference.
				Rather than continuing to stitch together so many different subregional plans, the 2022
				Blueprint took massive strides toward regional consistency by using the same methods and
				indicators across 15 states of the Southeast. To provide more complete coverage of the SECAS
				geography, it also incorporated two additional input plans: the latest update to the Florida
				Marine Blueprint for marine areas in Florida and the Caribbean Landscape Conservation Design
				for inland areas in Puerto Rico.
			</p>
		</div>

		<div>
			<h4>2023</h4>
			<p>
				Southeast Blueprint 2023 was released in October 2023 at the SEAFWA annual conference. For
				the first time, this Blueprint used a consistent approach across the entire geography and
				did not have to stitch together any subregional inputs. The 2023 Blueprint expanded
				consistent methods and indicators to Puerto Rico, the U.S. Virgin Islands, and nearshore
				U.S. Caribbean waters, as well as to the full extent of U.S. waters in the Atlantic Ocean
				and Gulf of America. This update significantly improved the older expert-driven,
				watershed-scale priorities for Puerto Rico, and the previous priorities for parts of the
				Atlantic and Gulf marine areas. It added new coverage of the U.S. Virgin Islands, U.S.
				Caribbean nearshore waters, and the rest of the Gulf and Atlantic marine environment. It
				also included minor refinements to the inland continental Southeast priorities and updated
				hubs and corridors for the full Blueprint area.
				<br /><br />
				In addition, SECAS added a new Point of Contact for a nonprofit organization, adding representation
				from the National Alliance of Forest Owners. SECAS also helped kickstart a new
				<a
					href="https://secasc.ncsu.edu/resources/caribbean-community-of-practice/"
					target="_blank"
				>
					Conservation Community of Practice</a
				>, a group is composed of community leaders, researchers, universities, non-profits, as well
				as federal, state, and territorial governments. All partners are all working together to
				build an applied science and resource management network, counteracting data inequities and
				the historic marginalization of island people in the Caribbean communities.
				<br /><br />
				The
				<a href={asset('/pdf/SECAS-goal-report-2023.pdf')} target="_blank"
					>fourth annual report on progress toward achieving the 10% goal</a
				> was also released.
			</p>
		</div>

		<div>
			<h4>2024</h4>
			<p>
				Southeast Blueprint 2024 was released in October 2024 ahead of the SEAFWA annual conference.
				Version 2024 focused on updating the priorities in the continental Southeast. It used
				refined prioritization and connectivity methods and incorporated a number of new and
				improved indicators for both inland and marine areas.
				<br /><br />
				In addition, SECAS added a new Point of Contact for a nonprofit organization, adding representation
				from the Native American Fish and Wildlife Society. SECAS also co-hosted the Landscape of the
				Future Summit, a meeting focused on sustaining nature and society in the Southeast, as well as
				the second annual meeting of the Caribbean Conservation Community of Practice. Finally, SECAS
				updated
				<a href={resolve('/story-map')}>its story map</a>
				celebrating successes across the region.
				<br /><br />
				The
				<a href={asset('/pdf/SECAS-goal-report-2024.pdf')} target="_blank"
					>fifth annual report on progress toward achieving the 10% goal</a
				> was also released.
			</p>
		</div>

		<div>
			<h4>2025</h4>
			<p>
				Southeast Blueprint 2025 was released in December 2025 following the SEAFWA annual
				conference. Version 2025 included numerous new and improved indicators in the inland,
				freshwater, and coastal areas of the continental Southeast and U.S. Caribbean. It also used
				refined prioritization and connectivity methods.
			</p>
		</div>
	</section>
</div>
