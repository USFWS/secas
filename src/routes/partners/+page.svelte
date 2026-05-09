<script lang="ts">
	import { Head, HeaderImage } from '$lib/components/layout'
	import { PartnerItem } from '$lib/components/elements'
	import { Button } from '$lib/components/ui/button'

	import HeroImage from '$lib/assets/images/hero/SouthAtlanticBlueprint2_2_workshop.jpg?format=avif;webp;jpg&w=3200;1920;720&as=picture'
	const caption = 'South Atlantic Blueprint workshop'
</script>

<Head
	title="Partners"
	description="Learn more about the groups and organizations participating in the Southeast Conservation Adaptation Strategy (SECAS)."
	imageURL={HeroImage.img.src}
/>

<HeaderImage src={HeroImage} {caption} title="SECAS Partners" />

<div class="page-content py-12 [&_section]:not-first:mt-16">
	<section>
		<h2>Partners make it happen</h2>
		<p class="text-lg">
			Environmental issues from urbanization to climate change extend beyond state boundaries and
			are outside the scope of any one organization to address. Through SECAS, federal and state
			agencies and other partners are leveraging resources to coordinate conservation actions and
			invest in cost-effective science to achieve a connected network of lands and waters that
			supports fish and wildlife populations and improved quality of life for people. SECAS was
			initiated by states of the Southeastern Association of Fish and Wildlife Agencies (SEAFWA) and
			the federal Southeast Natural Resource Leaders Group (SENRLG).
			<br /><br />
			Partners include members of the SECAS Steering Committee, which comprises five state agency directors
			from SEAFWA and one federal agency representative from SENRLG. The role of the steering committee
			is to provide oversight and strategic direction to SECAS.
			<br /><br />
			Explore partners below:
		</p>
		<div class="mt-2 grid grid-cols-4 gap-4">
			<div>
				<Button variant="secondary" size="lg" href="#State" class="w-full no-underline"
					>State partners</Button
				>
			</div>
			<div>
				<Button variant="secondary" size="lg" href="#Federal" class="w-full no-underline"
					>Federal partners</Button
				>
			</div>
			<div>
				<Button variant="secondary" size="lg" href="#Nonprofit" class="w-full no-underline"
					>Nonprofit partners</Button
				>
			</div>
			<div>
				<Button variant="secondary" size="lg" href="#Other" class="w-full no-underline"
					>Other partners</Button
				>
			</div>
		</div>
	</section>

	<section id="State">
		<h2>State partners</h2>
		<p>
			The following states are involved through the Southeastern Association of Fish and Wildlife
			Agencies (SEAFWA):
		</p>

		<div class="border-l-4 border-l-grey-2 pl-4">
			<PartnerItem
				organization="Alabama"
				name="Charles F. Sykes"
				title="Director, Wildlife and Freshwater Fisheries Division, Department of Conservation & Natural Resources"
				contacts={[
					{
						name: 'Traci Wood',
						email: 'traci.wood@dcnr.alabama.gov',
						title: 'Habitat and Species Conservation Coordinator'
					}
				]}
				class="mt-6"
			/>

			<PartnerItem
				organization="Arkansas"
				name="Chris Racey"
				title="Interim Director, Game and Fish Commission"
				contacts={[
					{
						name: 'Allison Fowler',
						email: 'allison.fowler@agfc.ar.gov',
						title: 'Assistant Chief, Wildlife Management'
					}
				]}
			/>

			<PartnerItem
				organization="Florida"
				name="Roger Young"
				title="Executive Director, Fish and Wildlife Conservation Commission"
				contacts={[
					{
						name: 'George Warthen',
						title: 'Chief Conservation Officer',
						email: 'george.warthen@myfwc.com'
					}
				]}
			/>
			<PartnerItem
				organization="Georgia"
				name="Ted Will"
				title=" Director, Wildlife Resources Division, Department of Natural Resources"
				contacts={[
					{
						name: 'Matt Elliott',
						title: 'Chief of Wildlife Conservation',
						email: 'Matt.Elliott@dnr.ga.gov'
					}
				]}
				steeringCommitteeMember
			/>
			<PartnerItem
				organization="Kentucky"
				name="Rich Storm"
				title="Commissioner, Department of Fish and Wildlife Resources"
				contacts={[
					{
						name: 'Laura Burford',
						title: 'Nongame Program Coordinator',
						email: 'Laura.burford@ky.gov'
					}
				]}
			/>

			<!-- FIXME: also add Tyler Bosworth, Secretary, Department of Wildlife and Fisheries -->
			<PartnerItem
				organization="Louisiana"
				name="Duck Locascio"
				title="Forestry Program Manager, Department of Wildlife and Fisheries"
				contacts={[
					{
						name: 'Kenny Ribbeck',
						title: 'Wildlife Division Chief',
						email: 'mailto:kribbeck@wlf.la.gov'
					}
				]}
				steeringCommitteeMember
			/>
			<PartnerItem
				organization="Mississippi"
				name="Lynn Posey"
				title="Executive Director, Department of Wildlife, Fisheries and Parks"
				contacts={[
					{
						name: 'John Gruchy',
						title: 'Private Lands Program Coordinator',
						email: 'JohnG@mdwfp.state.ms.us'
					},
					{
						name: 'Larry Pugh',
						title: 'Fisheries Bureau Director',
						email: 'Larry.Pugh@mdwfp.state.ms.us'
					}
				]}
			/>
			<PartnerItem
				organization="Missouri"
				name="Jason Sumners"
				title="Director, Department of Conservation"
				contacts={[
					{
						name: 'Nate Muenks',
						title: 'Natural Resource Planning Section Chief',
						email: 'Nathan.Muenks@mdc.mo.gov'
					},
					{
						name: 'Lorisa Smith',
						title: 'lorisa.smith@mdc.mo.gov',
						email: 'Government Affairs Specialist'
					}
				]}
				steeringCommitteeMember
			/>
			<PartnerItem
				organization="North Carolina"
				name="Kyle Briggs"
				title="Executive Director, Wildlife Resources Commission"
				contacts={[
					{
						name: 'Shannon Deaton',
						title: 'Habitat Conservation Division Chief',
						email: 'shannon.deaton@ncwildlife.org'
					},
					{
						name: 'Chris Wood',
						title: 'Landscape Planning Coordinator',
						email: 'chris.wood@ncwildlife.org'
					}
				]}
				steeringCommitteeMember
			/>
			<PartnerItem
				organization="Oklahoma"
				name="Wade Free"
				title="Interim Director, Department of Wildlife Conservation"
				contacts={[
					{ name: 'Wade Free', title: 'Assistant Director', email: 'wade.free@odwc.ok.gov' },
					{
						name: 'Mark Howery',
						title: 'Wildlife Diversity Biologist',
						email: 'mark.howery@odwc.ok.gov'
					}
				]}
			/>
			<PartnerItem
				organization="Puerto Rico"
				name="Waldemar Quiles"
				title="Secretary, Department of Natural and Environmental Resources"
				contacts={[
					{
						name: 'Miguel Garcia-Bermudez',
						title: 'Landscape Conservation Scientist, U.S. Fish and Wildlife Service',
						email: 'miguel_garcia-bermudez@fws.gov'
					}
				]}
			/>

			<PartnerItem
				organization="South Carolina"
				name="Tom Mullikin"
				title="Director, Department of Natural Resources"
				contacts={[
					{ name: 'Ken Prosser', title: 'Assistant Deputy Director', email: 'prosserk@dnr.sc.gov' }
				]}
			/>
			<PartnerItem
				organization="Tennessee"
				name="Jason Maxedon"
				title="Executive Director, Wildlife Resources Agency"
				contacts={[]}
			/>
			<PartnerItem
				organization="Texas"
				name="David Yoskowitz"
				title="Executive Director, Natural Resources, Parks and Wildlife Department"
				contacts={[
					{
						name: 'Jonah Evans',
						title: 'Nongame and Rare Species Program Leader',
						email: 'Jonah.Evans@tpwd.texas.gov'
					},
					{
						name: 'Amie Treuer-Kuehn',
						title: 'Ecologist',
						email: 'Amie.Treuer-Kuehn@tpwd.texas.gov'
					}
				]}
			/>
			<PartnerItem
				organization="U.S. Virgin Islands"
				name="Nicole Angeli"
				title="Director, Division of Fish and Wildlife, Department of Planning and Natural Resources"
				contacts={[
					{
						name: 'Nicole Angeli',
						title: 'Director and Acting Chief of Wildlife',
						email: 'nicole.angeli@dpnr.vi.gov'
					}
				]}
				steeringCommitteeMember
			/>
			<PartnerItem
				organization="Virginia"
				name="Ryan Brown"
				title="Executive Director, Department of Wildlife Resources"
				contacts={[
					{
						name: 'Cale Godfrey',
						title: 'Assistant Chief of Wildlife',
						email: 'cale.godfrey@dgif.virginia.gov'
					}
				]}
			/>
			<PartnerItem
				organization="West Virginia"
				name="Paul Johansen"
				title="Chief, Wildlife Resources Section, Division of Natural Resources"
				contacts={[
					{
						name: 'Scott Warner',
						title: 'Assistant Wildlife Resources Section Chief',
						email: 'scott.a.warner@wv.gov'
					}
				]}
				steeringCommitteeMember
			/>
		</div>
	</section>

	<section id="Federal">
		<h2>Federal partners</h2>
		<p>
			The following federal agencies are involved through the federal Southeast Natural Resource
			Leaders Group (SENRLG):
		</p>

		<div class="md:border-l-4 md:border-l-grey-2 md:pl-4">
			<PartnerItem
				organization="Bureau of Ocean Energy Management"
				name="Jim Kendall"
				title="Gulf of America Regional Director"
				contacts={[]}
				class="mt-6"
			/>
			<PartnerItem
				organization="Department of Defense"
				name="Ruth Forrester"
				title="Regional Environmental Coordinator, Regional Environmental and Energy Office - Southern"
				contacts={[
					{
						name: 'Cynthia Jester',
						title: 'Army Regional Energy Coordinator',
						email: 'cynthia.d.jester2@usace.army.mil'
					}
				]}
			/>
			<PartnerItem
				organization="Environmental Protection Agency"
				name="Jeaneanne Gettle"
				title="Southeast Acting Regional Administrator"
				contacts={[]}
			/>
			<PartnerItem
				organization="Federal Emergency Management Agency"
				name="Gracia Szczech"
				title="Southeast Regional Administrator"
				contacts={[
					{
						name: 'Kari Elkins',
						title: 'Southeast Unified Federal Review Coordinator',
						email: 'kari.elkins@fema.dhs.gov'
					}
				]}
			/>
			<PartnerItem
				organization="Federal Highway Administration"
				name="Derrell Turner"
				title="Director of Field Services - South"
				contacts={[]}
			/>

			<PartnerItem
				organization="National Oceanic and Atmospheric Administration"
				name="Andy Strelcheck"
				title="Southeast Regional Administrator, National Marine Fisheries Service"
				contacts={[
					{
						name: 'Kristen Laursen',
						title: 'Gulf of America Regional Coordinator',
						email: 'kristen.r.laursen@noaa.gov'
					}
				]}
			/>
			<PartnerItem
				organization="National Park Service"
				name="Mark Foust"
				title="Southeast Regional Director"
				contacts={[]}
			/>
			<PartnerItem
				organization="Natural Resource Conservation Service"
				name="James Tillman"
				title="Southeast Regional Conservationist"
				contacts={[
					{
						name: 'Bridgett Estel Costanzo',
						title: 'NRCS East Working Lands for Wildlife Coordinator',
						email: 'bridgett.costanzo@va.usda.gov'
					}
				]}
			/>
			<PartnerItem
				organization="Tennessee Valley Authority"
				name="Rebecca Hayden"
				title="Director of Natural Resources"
				contacts={[
					{
						name: "Shannon O'Quinn",
						title: 'Senior Water Resource Specialist',
						email: 'tsoquinn@tva.gov'
					}
				]}
			/>
			<PartnerItem
				organization="U.S. Army Corps of Engineers"
				name="BG Daniel Hibner"
				title="Commanding General, South Atlantic Division"
				contacts={[
					{
						name: 'Gretchen Ehlinger',
						title: 'South Atlantic Division Water Resources Planner',
						email: 'gretchen.s.ehlinger@usace.army.mil'
					},
					{
						name: 'Dave Bauman',
						title: 'South Atlantic Division Regional Environmental Specialist',
						email: 'david.j.bauman@usace.army.mil'
					}
				]}
			/>
			<PartnerItem
				organization="U.S. Fish and Wildlife Service"
				name="Mike Oetker"
				title="Southeast Regional Director, Interior Regions 2 & 4"
				contacts={[
					{
						name: 'Rafael Gonzalez',
						title: 'Acting Assistant Regional Director of Science Applications and Migratory Birds',
						email: 'rafael_gonzalez@fws.gov'
					}
				]}
				steeringCommitteeMember
			/>
			<PartnerItem
				organization="U.S. Forest Service"
				name="Ken Arney"
				title="Southeast Regional Forester"
				contacts={[
					{
						name: 'Daniel McInnis',
						title: 'Environmental Issues and Policy Analyst',
						email: 'dmcinnis@fs.fed.us'
					}
				]}
			/>
			<PartnerItem
				organization="U.S. Geological Survey"
				name="Holly Weyers"
				title="Southeast Regional Director"
				contacts={[
					{
						name: 'Greg Steyer',
						title: 'Gulf of America Regional Science Advisor',
						email: 'steyerg@usgs.gov'
					},
					{
						name: 'Richard Rebich',
						title: 'Science Coordinator of the Office of the Southeast Regional Director',
						email: 'rarebich@usgs.gov'
					}
				]}
			/>
		</div>
	</section>

	<section id="Nonprofit">
		<h2>Nonprofit partners</h2>
		<p>The following nonprofit organizations are involved:</p>

		<div class="md:border-l-4 md:border-l-grey-2 md:pl-4">
			<PartnerItem
				organization="National Alliance of Forest Owners"
				name="Kristin Sleeper"
				title="Director of Policy and Research"
				contacts={[
					{
						name: 'Kristin Sleeper',
						email: 'ksleeper@nafoalliance.org'
					},
					{ name: 'Kate Gatto', title: 'Chief Strategy Officer', email: 'kgatto@nafoalliance.org' }
				]}
				class="mt-6"
			/>
			<PartnerItem
				organization="Native American Fish and Wildlife Society"
				name="Mike LaVoie"
				title="Southeast Regional Director"
				contacts={[
					{
						name: 'Mike LaVoie',
						email: 'michlavo@ebci-nsn.gov'
					}
				]}
			/>
			<PartnerItem
				organization="The Nature Conservancy"
				name="Eric Krueger"
				title="South Carolina Director of Science and Stewardship"
				contacts={[
					{
						name: 'Eric Krueger',
						email: 'ekrueger@tnc.org'
					},
					{
						name: 'Laura Chartier',
						title: 'Southern U.S. Division Conservation Manager',
						email: 'laura.chartier@tnc.org'
					}
				]}
			/>
			<PartnerItem
				organization="Open Space Institute"
				name="Joel Houser"
				title="Southeast Field Coordinator"
				contacts={[{ name: 'Joel Houser', email: 'jhouser@osiny.org' }]}
			/>
			<PartnerItem
				organization="Southern Group of State Foresters"
				name="Gary Wood"
				title="Southeast Regional Coordinator of the Cohesive Wildland Fire Strategy"
				contacts={[
					{
						name: 'Gary Wood',
						email: 'gwood@southernforests.org'
					}
				]}
			/>
		</div>
	</section>

	<section id="Other">
		<h2>Other partners</h2>
		<p>The following organizations are actively involved in SECAS:</p>

		<div class="md:border-l-4 md:border-l-grey-2 md:pl-4">
			<PartnerItem
				organization="The Southeast Climate Adaptation Science Center"
				name="Ryan Boyles"
				title="Deputy Director"
				contacts={[{ name: 'Ryan Boyles', email: 'rboyles@usgs.gov' }]}
				class="mt-6"
			/>
			<PartnerItem
				organization="The Southeast Aquatic Resources Partnership"
				name="Todd Ewing"
				title="Program Director"
				contacts={[{ name: 'Todd Ewing', email: 'todd@southeastaquatics.net' }]}
			/>
		</div>
	</section>
</div>
