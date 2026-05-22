<script lang="ts">
	import { resolve } from '$app/paths'
	import Logo from '$images/SECAS_logo.svg'
</script>

<a
	href={resolve('/subscribe/')}
	class="mt-12 mb-8 block items-center gap-8 rounded-lg border-2 border-blue-8/50 bg-blue-1/50 p-4 text-foreground no-underline hover:border-blue-8 hover:bg-blue-1 md:flex"
>
	<img src={Logo} alt="SECAS logo" class="h-12" />
	<div class="mt-2 text-lg md:mt-0">
		<b>Sign up for the SECAS monthly newsletter</b> to read about the latest updates and
		opportunities to get involved! <span class="text-link underline">Learn more here. </span>
	</div>
</a>
