<script lang="ts">
	import AboutIcon from '@lucide/svelte/icons/info'
	import { resolve } from '$app/paths'
	import Logo from '$lib/assets/SECAS_logo_graphic.svg'

	import Nav from './Nav.svelte'
	import MobileNav from './MobileNav.svelte'

	const navItems = [
		{
			label: 'About',
			icon: AboutIcon,
			children: [
				{ url: '/about/', label: 'About SECAS' },
				{ url: '/our-goal/', label: 'Learn more about the SECAS goal', icon: '' },
				{ url: '/staff/', label: 'Staff', icon: '' },
				{ url: '/committees/', label: 'Committees and teams', icon: '' },
				{ url: '/partners/', label: 'Partners', icon: '' }
			]
		},

		{ url: '/blueprint/', label: 'Blueprint', icon: '' },
		{ url: '/story-map/', label: 'In Action', icon: '' },
		{ url: '/resources/', label: 'Resources', icon: '' },
		{ url: '/events/', label: 'Events', icon: '' },
		{ url: '/blog/', label: 'Blog', icon: '' }
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
