<script lang="ts">
	// style override: changed much of style
	import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui'
	import { cn } from '$lib/utils.js'

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: NavigationMenuPrimitive.LinkProps = $props()
</script>

<NavigationMenuPrimitive.Link
	bind:ref
	data-slot="navigation-menu-link"
	class={cn(
		'flex items-center gap-1 rounded-none border-t-4 border-b-4 border-t-transparent border-b-transparent p-2 text-base leading-none text-white no-underline transition-all outline-none hover:border-b-white hover:bg-black/10 focus:bg-black/10 focus-visible:border-b-white focus-visible:ring-2 lg:text-lg xl:text-xl',
		className
	)}
	{...restProps}
/>
