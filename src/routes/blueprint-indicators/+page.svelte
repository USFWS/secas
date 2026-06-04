<script lang="ts">
	import DownloadIcon from '@lucide/svelte/icons/download'
	import { asset } from '$app/paths'
	import { Head } from '$lib/components/layout'

	import { Button } from '$lib/components/ui/button'
	import FreshwaterIcon from '$images/freshwater_icon.svg'
	import MarineIcon from '$images/marine_icon.svg'
	import TerrestrialIcon from '$images/terrestrial_icon.svg'
	import ContinentalIcon from '$images/ContinentalIndicators_Icon.png'
	import CaribbeanIcon from '$images/CaribbeanIndicators_Icon.png'
	import rawIndicators from './indicators.json'

	type Indicator = {
		name: string
		description: string
		url: string
	}

	type Ecosystems = Record<string, Indicator[]>

	const ecosystems = ['Terrestrial', 'Freshwater', 'Coastal & Marine']

	const icons = {
		Freshwater: FreshwaterIcon,
		'Coastal & Marine': MarineIcon,
		Terrestrial: TerrestrialIcon
	}

	const continentalIndicators: Ecosystems = {}
	const caribbeanIndicators: Ecosystems = {}
	let indicatorCount = $state(0)

	Object.entries(rawIndicators).forEach(([ecosystem, indicators]) => {
		continentalIndicators[ecosystem] = indicators.filter(
			({ name }) => !(name.startsWith('Caribbean') || name.startsWith('Puerto'))
		)
		caribbeanIndicators[ecosystem] = indicators.filter(
			({ name }) => name.startsWith('Caribbean') || name.startsWith('Puerto')
		)
		indicatorCount +=
			continentalIndicators[ecosystem].length + caribbeanIndicators[ecosystem].length
	})
</script>

<Head
	title="Blueprint Indicators"
	description="Learn more about the indicators used to create the Southeast Conservation Blueprint."
/>

<div class="page-content py-12 print:pt-0">
	<h1 class="print:text-4xl">The Southeast Blueprint Indicators</h1>
	<p class="mt-4">
		The Southeast Conservation Blueprint is based on {indicatorCount} natural and cultural resource indicators
		that represent terrestrial, freshwater, and coastal/marine ecosystems.
	</p>
	<div class="flex justify-end">
		<Button
			href={asset('/pdf/IndicatorCheatSheet_2025.pdf')}
			target="_blank"
			variant="secondary"
			size="sm"
			class="no-underline print:hidden"
		>
			<DownloadIcon class="size-4" />
			Download a printable indicator "cheat sheet"
		</Button>
	</div>

	<section class="mt-12">
		<div class="grid grid-cols-[160px_1fr] gap-6">
			<div>
				<img src={ContinentalIcon} alt="map of continential region" class="border-none" />
			</div>
			<div>
				<h2>Continental</h2>
				<div class="text-muted-foreground text-xl">
					15 Southeast states + U.S. Atlantic and Gulf waters
				</div>
			</div>
		</div>

		<div class="mt-6">
			{#each ecosystems as ecosystem (ecosystem)}
				<div class="bg-grey-1/50 p-2 rounded-md flex gap-2 items-center not-first:mt-12">
					<div class="flex-none">
						<img
							src={icons[ecosystem as keyof typeof icons]}
							alt={`${ecosystem} icon`}
							class="size-12 border-none"
						/>
					</div>
					<h3 class="text-secondary">
						{ecosystem}
					</h3>
				</div>
				<div class="text-sm mt-4">
					{#each continentalIndicators[ecosystem as keyof typeof continentalIndicators] as indicator (indicator.name)}
						<div class="not-first:mt-6 break-inside-avoid">
							<a href={indicator.url} target="_blank" class="text-lg block">{indicator.name}</a>
							{indicator.description}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</section>

	<section class="mt-20">
		<div class="grid grid-cols-[160px_1fr] gap-6">
			<div>
				<img src={CaribbeanIcon} alt="map of Caribbean region" class="border-none" />
			</div>
			<div>
				<h2>Continental</h2>
				<div class="text-muted-foreground text-xl">
					Puerto Rico & the U.S. Virgin Islands + nearshore marine waters
				</div>
			</div>
		</div>

		<div class="mt-6">
			{#each ecosystems as ecosystem (ecosystem)}
				<div class="bg-grey-1/50 p-2 rounded-md flex gap-2 items-center not-first:mt-12">
					<div class="flex-none">
						<img
							src={icons[ecosystem as keyof typeof icons]}
							alt={`${ecosystem} icon`}
							class="size-12 border-none"
						/>
					</div>
					<h3 class="text-secondary">
						{ecosystem}
					</h3>
				</div>
				<div class="text-sm mt-4">
					{#each caribbeanIndicators[ecosystem as keyof typeof caribbeanIndicators] as indicator (indicator.name)}
						<div class="not-first:mt-6 break-inside-avoid">
							<a href={indicator.url} target="_blank" class="text-lg block">{indicator.name}</a>
							{indicator.description}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</section>
</div>
