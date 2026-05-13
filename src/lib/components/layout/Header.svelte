<script lang="ts">
	import { resolve } from '$app/paths'
	import Logo from '$lib/assets/SECAS_logo_graphic.svg'

	import Nav from './Nav.svelte'
	import MobileNav from './MobileNav.svelte'

	const navItems = [
		{
			label: 'About',
			children: [
				{ url: '/about/', label: 'About SECAS' },
				{ url: '/our-goal/', label: 'SECAS goal' },
				{ url: '/staff/', label: 'Staff' },
				{ url: '/committees/', label: 'Committees and teams' }
				// { url: '/partners/', label: 'Partners' }
			]
		},
		{
			label: 'Blueprint',
			children: [
				{ url: '/blueprint/', label: 'About the Blueprint' },
				{ url: '/blueprint-data-download/', label: 'Download the latest version' },
				{ url: '/blueprint-known-issues/', label: 'Known issues' },
				{ url: '/organizations-using-the-blueprint/', label: 'Organizations using the Blueprint' }
			]
		},

		{ url: '/story-map/', label: 'In Action' },
		{ url: '/resources/', label: 'Resources' },
		{ url: '/events/', label: 'Events' },
		{ url: '/blog/', label: 'Blog' }
	]
</script>

<header
	class="flex flex-none items-center justify-between gap-6 border-b-4 border-blue-9 bg-blue-8 p-1 leading-none"
>
	<div class="flex flex-auto items-center gap-3">
		<div class="flex-none">
			<a href={resolve('/')} class="no-underline">
				<img src={Logo} class="my-px h-10" alt="SECAS Logo" />
			</a>
		</div>
		<div>
			<a href={resolve('/')} class="font-semibold tracking-wide text-white no-underline">
				<div class="text-sm leading-none xl:text-xl">Southeast Conservation</div>
				<div class="text-sm leading-none xl:text-xl">Adaptation Strategy</div>
			</a>
		</div>
	</div>
	<Nav items={navItems} />
	<MobileNav items={navItems} />
</header>
