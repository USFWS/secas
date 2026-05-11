<script lang="ts">
	import { untrack } from 'svelte'
	import { page } from '$app/state'
	import { goto } from '$app/navigation'

	import { Head } from '$lib/components/layout'
	import type { Project } from '$lib/components/map/types'
	import { Map, ProjectDetails, ProjectList } from '$lib/components/map/index.js'

	const { data } = $props()

	// intentionally only using the first value
	const { projects, projectIndex } = untrack(() => data)

	let sidebarNode: Element

	let selectedProject: Project | null = $state(
		window.location.hash
			? projectIndex[window.location.hash.slice(1) as keyof typeof projectIndex]
			: null
	)
	const setProject = (id: string | null) => {
		selectedProject = id === null ? null : projectIndex[id as keyof typeof projectIndex]
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
		setProject(hash ? hash.slice(1) : null)

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

<main class="relative flex h-full w-full gap-0">
	<div
		class="z-[100] w-[440px] flex-none overflow-y-auto border-r-2 border-grey-2 bg-white"
		bind:this={sidebarNode}
	>
		{#if selectedProject}
			<ProjectDetails {...selectedProject} onClose={closeProject} />
		{:else}
			<ProjectList {projects} />
		{/if}
	</div>
	<Map {projects} {selectedProject} onMarkerClick={openProject} />
</main>
