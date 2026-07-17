<script lang="ts">
	import { resolve } from '$app/paths'
	import Logo from '$images/SECAS_logo_graphic.svg'

	import { navItems } from '$lib/nav'
	import Nav from './Nav.svelte'
	import MobileNav from './MobileNav.svelte'
</script>

<header
	class="flex flex-none items-center justify-between gap-6 border-b-4 border-blue-9 bg-blue-8 p-1 leading-none print:hidden"
>
	<div class="flex flex-auto items-center gap-3">
		<div class="flex-none">
			<a href={resolve('/')} class="no-underline">
				<img src={Logo} class="my-px size-10" alt="SECAS Logo" />
			</a>
		</div>
		<div>
			<a href={resolve('/')} class="font-bold tracking-wider text-white no-underline">
				<div class="text-sm leading-none xl:text-xl">Southeast Conservation</div>
				<div class="text-sm leading-none xl:text-xl">Adaptation Strategy</div>
			</a>
		</div>
	</div>
	<Nav items={navItems} />
	<MobileNav items={navItems} />
</header>
