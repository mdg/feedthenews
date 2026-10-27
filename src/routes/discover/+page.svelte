<script lang="ts">
	import { goto } from '$app/navigation';
	import MainLayout from '$lib/components/MainLayout.svelte';
	import MemberContent from '$lib/components/MemberContent.svelte';
	import Username from '$lib/components/Username.svelte';
	import { fetchQuery } from '$lib/graph';
	import type { GetDiscoverQueryResult } from '$lib/generated/query';

	let topics = $state<GetDiscoverQueryResult['search']['topics']['items']>([]);
	let makers = $state<GetDiscoverQueryResult['search']['makers']['items']>([]);
	let loading = $state(true);
	let error = $state(false);

	let query = $state('');
	let selectedTopic = $state<string | null>(null);

	$effect(() => {
		loading = true;
		error = false;

		fetchQuery()
			.GetDiscover()
			.then((res) => {
				topics = res.search.topics.items;
				makers = res.search.makers.items;
			})
			.catch(() => {
				error = true;
			})
			.finally(() => {
				loading = false;
			});
	});

	function search() {
		// TODO: wire query + topic filter into the search API
	}

	function toggleTopic(slug: string) {
		selectedTopic = selectedTopic === slug ? null : slug;
	}
</script>

<svelte:head><title>Discover | Feed The News</title></svelte:head>

<MainLayout>
	<MemberContent title="Discover" {loading}>
		{#if error}
			<p class="mt-8 text-sm text-red-600">Could not load search. Please try again.</p>
		{:else}
			<form
				class="mt-8 flex items-center gap-3"
				onsubmit={(e) => {
					e.preventDefault();
					search();
				}}
			>
				<input
					type="search"
					bind:value={query}
					placeholder="Search journalists and topics"
					class="w-full rounded-md border-stone-300 text-sm shadow-sm focus:border-stone-500 focus:ring-stone-500"
				/>
				<button
					type="submit"
					class="shrink-0 rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-700"
				>
					Search
				</button>
			</form>

			{#if topics.length > 0}
				<div class="mt-4 flex flex-wrap items-center gap-2">
					{#each topics as topic (topic.slug)}
						<button
							type="button"
							onclick={() => toggleTopic(topic.slug)}
							class="rounded-full border px-3 py-1.5 text-sm font-medium {selectedTopic === topic.slug
								? 'border-stone-900 bg-stone-900 text-stone-50'
								: 'border-stone-300 bg-white text-stone-700 hover:bg-stone-100'}"
						>
							{topic.name}
						</button>
					{/each}
				</div>
			{/if}

			{#if makers.length > 0}
				<ul class="mt-8 divide-y divide-stone-200 rounded-xl bg-white shadow-sm">
					{#each makers as maker (maker.name)}
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

							{#if maker.sessionUser?.sponsored}
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
					{/each}
				</ul>
			{:else}
				<p class="mt-8 text-sm text-stone-500">No journalists found</p>
			{/if}
		{/if}
	</MemberContent>
</MainLayout>
