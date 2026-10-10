<script lang="ts">
	import { page } from '$app/state';
	import MainLayout from '$lib/components/MainLayout.svelte';
	import MemberContent from '$lib/components/MemberContent.svelte';
	import SignInModal from '$lib/components/SignInModal.svelte';

	let { data } = $props();
	let signInOpen = $state(false);

	const insertedAt = $derived(data.dashboard.sessionUser?.subscription?.insertedAt ?? null);
	const insertedAtLabel = $derived(
		insertedAt
			? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(insertedAt))
			: null
	);

	const sponsorships = $derived(data.dashboard.sessionUser?.sponsorships.items ?? []);
	const sponsors = $derived(
		(data.dashboard.sessionMaker?.sponsorships.items ?? []).flatMap((s) =>
			s.sponsor ? [s.sponsor.name] : []
		)
	);
	const dateFmt = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });
	function formatDate(value: unknown) {
		return value ? dateFmt.format(new Date(String(value))) : '—';
	}
</script>

<svelte:head><title>Dashboard | Feed The News</title></svelte:head>

<MainLayout>
	<MemberContent title="Dashboard">

		{#if data.dashboard.sessionMaker}
			<section class="mt-8">
				<h2 class="font-serif text-xl font-bold tracking-tight text-stone-900">Sponsors</h2>
				{#if sponsors.length > 0}
					<ul class="mt-4 max-w-md divide-y divide-stone-200 rounded-lg bg-white shadow-sm">
						{#each sponsors as name (name)}
							<li class="px-6 py-4 text-sm font-semibold text-stone-900">{name}</li>
						{/each}
					</ul>
				{:else}
					<p class="mt-4 text-sm text-stone-500">No sponsors yet</p>
				{/if}
			</section>
		{/if}
</MemberContent>
</MainLayout>

{#if signInOpen}
	<SignInModal onClose={() => (signInOpen = false)} />
{/if}
