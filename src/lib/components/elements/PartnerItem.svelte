<script lang="ts">
	import { cn } from '$lib/utils'

	type Contact = {
		name: string
		title?: string
		email: string
	}

	type Props = {
		organization: string
		name?: string
		title?: string
		contacts: Array<Contact>
		steeringCommitteeMember?: boolean
		class?: string
		notes?: string
	}

	const {
		organization,
		name,
		title,
		contacts,
		steeringCommitteeMember,
		class: className = '',
		notes
	}: Props = $props()
</script>

<div
	class={cn(
		' not-first-of-type:mt-6 not-first-of-type:border-t not-first-of-type:border-t-grey-2 not-first-of-type:pt-4',
		className
	)}
>
	<div class="grid grid-cols-1 gap-2 md:grid-cols-[3fr_2fr] md:gap-8">
		<div>
			<div class="text-lg leading-tight font-bold underline">{organization}</div>
			<p class="mt-2 leading-tight">
				{#if name}
					{name}
					{#if steeringCommitteeMember}
						<i>(steering committee member)</i>
					{/if}

					{#if title}
						<br />
						<span class="text-muted-foreground italic">{title}</span>
					{/if}
				{/if}
			</p>
			{#if notes}
				<div class="mt-2 text-sm text-muted-foreground">Note: {notes}</div>
			{/if}
		</div>

		<div>
			<p class="rounded-lg border border-grey-2 bg-grey-0 p-2 leading-tight md:mt-2">
				<b>{contacts.length <= 1 ? 'Point of contact:' : 'Points of contact:'}</b>
				<br />

				{#each contacts as { name, title, email }, i (email)}
					{#if i > 0}
						<br />
					{/if}
					<a href={`mailto:${email}`} target="_blank">
						{name}
					</a>{#if title}, <span class="text-foreground/90 italic">{title}</span>{/if}
				{:else}
					Vacant
				{/each}
			</p>
		</div>
	</div>
</div>
