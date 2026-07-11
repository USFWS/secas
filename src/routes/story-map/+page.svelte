<script lang="ts">
	import CircleX from '@lucide/svelte/icons/circle-x'

	import { untrack } from 'svelte'
	import { bbox as calculateBounds } from '@turf/bbox'
	import type { AllGeoJSON as GeoJSON } from '@turf/helpers'

	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import { asset } from '$app/paths'
	import { page } from '$app/state'

	import { Head } from '$lib/components/layout'
	import type { Project } from '$lib/components/map/types'
	import { Map, ProjectDetails, ProjectList } from '$lib/components/map'
	import { Button } from '$lib/components/ui/button'
	import { cn } from '$lib/utils'

	type View = 'sidebar' | 'map'

	const { data } = $props()
	let view: View = $state('sidebar')

	// intentionally only using the first value, doesn't change after loading
	const { projects, projectIndex } = untrack(() => data)

	type ProjectId = keyof typeof projectIndex

	let sidebarNode: Element

	let selectedProject: Project | null = $state(null)

	let isLoading: boolean = $state(false)
	let isError: boolean = $state(false)

	const loadBoundary = async (id: ProjectId) => {
		if (
			!browser ||
			isLoading ||
			isError ||
			projectIndex[id].boundary_ids ||
			projectIndex[id].boundary
		) {
			return
		}

		isLoading = true
		isError = false
		try {
			const path = asset(`/_boundaries/${id}/boundary.json`)
			const response = await fetch(`${window.location.origin}${path}`)
			const boundary = await response.json()

			projectIndex[id].boundary = boundary
			projectIndex[id].bounds = calculateBounds(boundary as GeoJSON)
			// Trigger refresh
			selectedProject = projectIndex[id]
			isLoading = false
			isError = false
		} catch (ex) {
			console.error(ex)
			isLoading = false
			isError = true
		}
	}

	const setProject = async (id: ProjectId | null) => {
		isLoading = false
		isError = false
		selectedProject = id === null ? null : (projectIndex[id] as Project) || null

		if (selectedProject !== null && !(selectedProject.boundary_ids || selectedProject.boundary)) {
			loadBoundary(id as ProjectId)
		}
	}

	const openProject = (id: string) => {
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto(`${page.url.pathname}#${id}`)
	}

	const closeProject = () => {
		goto(page.url.pathname)
	}

	$effect(() => {
		const hash = page.url.hash
		// when hash updates, set project
		untrack(() => {
			// make sure modifying project does not re-trigger this effect
			setProject(hash ? (hash.slice(1) as ProjectId) : null)
		})

		// scroll sidebar to top on change of content
		if (sidebarNode) {
			sidebarNode.scrollTo({ top: 0, behavior: 'auto' })
		}
	})
</script>

<Head
	title="Story Map"
	description="An interactive map detailing a collection of projects in the Southeast Conservation Adaptation Strategy (SECAS) footprint."
/>

<div class="flex flex-col h-full w-full overflow-hidden">
	<!-- have to show selected project header over map in small viewports -->
	{#if selectedProject}
		<div
			class={cn(
				'flex-none sm:hidden pl-4 pr-2 pt-2 flex justify-between gap-4 border-b border-b-grey-2 pb-1',
				{ 'border-transparent': view === 'sidebar' }
			)}
		>
			<div class="flex-auto text-lg leading-tight font-bold">
				{selectedProject.title}
			</div>
			<div class="flex-none">
				<Button
					variant="ghost"
					size="lg"
					onclick={closeProject}
					class="mt-1 h-auto rounded-full p-0 text-muted-foreground/75 hover:text-foreground"
					title="close project"
				>
					<CircleX class="size-6" />
				</Button>
			</div>
		</div>
	{/if}

	<main
		class="relative sm:grid sm:grid-cols-[440px_1fr] h-full w-full gap-0 flex-auto overflow-hidden"
	>
		<div
			class={cn('z-100 w-full flex-none overflow-y-auto border-r-2 border-grey-2 bg-white h-full', {
				hidden: view === 'map'
			})}
			bind:this={sidebarNode}
		>
			{#if selectedProject}
				<ProjectDetails {...selectedProject} {isLoading} {isError} onClose={closeProject} />
			{:else}
				<ProjectList {projects} />
			{/if}
		</div>
		<div
			class={cn('z-1 absolute left-0 right-0 bottom-0 top-0 sm:relative', {
				'invisible sm:visible': view === 'sidebar'
			})}
		>
			<Map {projects} {selectedProject} onMarkerClick={openProject} />
		</div>
	</main>

	<!-- show button bar only in mobile mode -->
	<div class="flex-none grid grid-cols-2 w-full bg-blue-8/80 sm:hidden border-t border-t-blue-9">
		<Button
			variant="ghost"
			class={cn('text-white w-full rounded-none border-none', {
				'bg-blue-8': view === 'sidebar'
			})}
			onclick={() => {
				view = 'sidebar'
			}}
		>
			{#if selectedProject}
				show project details
			{:else}
				show projects list
			{/if}
		</Button>
		<Button
			variant="ghost"
			class={cn('text-white w-full rounded-none border-none', { 'bg-blue-8': view === 'map' })}
			onclick={() => {
				view = 'map'
			}}>show map</Button
		>
	</div>
</div>
