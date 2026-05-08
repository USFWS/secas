<script lang="ts" module>
	// style override: changed much of style
	import { cn } from '$lib/utils.js'
	import { tv } from 'tailwind-variants'

	export const navigationMenuTriggerStyle = tv({
		base: 'cursor-pointer text-white text-base lg:text-lg xl:text-xl border-t-4 border-t-transparent border-b-4 border-b-transparent hover:bg-black/10 focus:bg-black/10 data-[state=open]:hover:bg-black/10 data-[state=open]:focus:bg-black/10 data-[state=open]:bg-black/10 data-[state=open]:border-b-white focus-visible:border-b-white group inline-flex h-10.5 w-max items-center justify-center rounded-none p-2 font-medium transition-[color,box-shadow] outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 gap-2'
	})
</script>

<script lang="ts">
	import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui'
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down'
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: NavigationMenuPrimitive.TriggerProps = $props()
</script>

<NavigationMenuPrimitive.Trigger
	bind:ref
	data-slot="navigation-menu-trigger"
	class={cn(navigationMenuTriggerStyle(), 'group', className)}
	{...restProps}
>
	{@render children?.()}
	<!-- <ChevronDownIcon
		class="relative top-px -ml-1 size-5 transition duration-300 group-data-[state=open]:rotate-180"
		aria-hidden="true"
	/> -->
</NavigationMenuPrimitive.Trigger>
