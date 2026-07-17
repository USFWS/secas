<script lang="ts">
	import { groupBy } from '$lib/util/data'

	type Metric = {
		ecosystem: string
		type: string
		indicator: string
		percent_change: string // parsed to float
	}

	type Props = {
		metrics: Metric[]
	}

	const { metrics }: Props = $props()

	// ecosystem is not currently used
	const groups = $derived(groupBy(metrics, 'type'))

	const getPosition = (rawPercent: string) => {
		const percent = parseFloat(rawPercent)
		if (percent <= -2) {
			return 0
		}
		if (percent >= 2) {
			return 100
		}
		// scale to a -2 to +2 scale
		return 100 * ((percent - -2) / 4)
	}
</script>

<div class="mt-6">
	<h4>
		Estimated percent change in indicator over 4 years, based on best available data since SECAS was
		established in 2011
	</h4>
	<div class="mt-4">
		{#each Object.entries(groups) as [groupType, indicators] (groupType)}
			<div
				class="grid grid-cols-1 md:grid-cols-[1fr_4fr] not-first:mt-16 sm:not-first:mt-8 md:not-first:mt-0 md:gap-4 not-first:pt-8 md:not-first:pt-0 not-first:border-t not-first:border-t-grey-6"
			>
				<div class="flex items-center font-bold text-xl">
					{groupType}
				</div>
				<div>
					{#each indicators.sort( ({ indicator: indicatorA }, { indicator: indicatorB }) => (indicatorA < indicatorB ? -1 : 1) ) as { indicator, percent_change } (indicator)}
						<div
							class="grid grid-cols-1 sm:grid-cols-[1fr_1.25fr] gap-2 not-first:border-t not-first:border-t-grey-2 not-first:mt-8 sm:not-first:mt-0 pt-2.5 pb-1 break-inside-avoid"
						>
							<div>
								{indicator}
								<div class="text-sm text-muted-foreground">
									{Math.abs(percent_change)}% {percent_change < 0 ? 'decline' : 'increase'}
								</div>
							</div>

							<div class="relative w-full">
								<div class="w-full grid grid-cols-4">
									<div class="bg-[#D2222A] h-2.5 w-full"></div>
									<div class="bg-[#D2222A] h-2.5 w-full"></div>
									<div class="bg-[#FFF201] h-2.5 w-full"></div>
									<div class="bg-[#40AD48] h-2.5 w-full"></div>
								</div>
								<div class="absolute w-full flex justify-between gap-0 top-0">
									<div class="absolute border-l-2 border-black h-4.5 top-0 left-0"></div>
									<div class="absolute border-l-2 border-black h-4.5 top-0 left-[25%]"></div>
									<div class="absolute border-l-2 border-black h-4.5 top-0 left-[50%]"></div>
									<div class="absolute border-l-2 border-black h-4.5 top-0 left-[75%]"></div>
									<div class="absolute border-l-2 border-black h-4.5 top-0 -right-[2px]"></div>
								</div>
								<div class="absolute text-sm text-muted-foreground top-4.5 w-full">
									<div class="absolute top-0 left-0 -ml-2">&lt;-2%</div>
									<div class="absolute top-0 left-[25%] -ml-1.5">-1%</div>
									<div class="absolute top-0 left-[50%] -ml-1.5">0%</div>
									<div class="absolute top-0 left-[75%] -ml-1.5">1%</div>
									<div class="absolute top-0 right-0 -mr-3.5">&gt;2%</div>
								</div>
								<div
									class="absolute rounded-full size-[20px] bg-black border-black -top-1 -ml-[10px]"
									style="left:{getPosition(percent_change)}%;"
								></div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
