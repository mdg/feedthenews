<script lang="ts">
	import Username from './Username.svelte';
	import type { GetDiscoverQueryResult } from '$lib/generated/query';

	type Maker = GetDiscoverQueryResult['search']['makers']['items'][number];

	let { maker }: { maker: Maker } = $props();
</script>

<li class="flex items-center gap-4 px-6 py-4">
	{#if maker.avatar}
		<img
			src={maker.avatar}
			alt={`${maker.name}'s avatar`}
			class="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-stone-200"
		/>
	{/if}

	<div class="min-w-0 flex-1">
		<a
			href={`/@${maker.name}`}
			class="text-sm font-semibold text-stone-900 hover:underline"
		>
			<Username name={maker.name} platformType={maker.platformType} />
		</a>
	</div>

	{#if maker.sessionUserSponsorship}
		<span
			class="shrink-0 rounded-md bg-stone-200 px-4 py-2 text-sm font-medium text-stone-700"
		>
			Sponsored
		</span>
	{:else}
		<a
			href={`/@${maker.name}`}
			class="shrink-0 rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-700"
		>
			Sponsor
		</a>
	{/if}
</li>
