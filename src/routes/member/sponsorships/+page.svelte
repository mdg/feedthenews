<script lang="ts">
	import { page } from '$app/state';
	import MainLayout from '$lib/components/MainLayout.svelte';
	import MemberContent from '$lib/components/MemberContent.svelte';
	import Label from '$lib/components/Label.svelte';
	import Username from '$lib/components/Username.svelte';
	import MakerList from '$lib/components/MakerList.svelte';
	import { fetchQuery } from '$lib/graph';
	import type { GetSponsorshipsQueryResult } from '$lib/generated/query';

	const sessionUser = $derived(page.data.sessionUser);

	let sponsorships = $state<
		NonNullable<GetSponsorshipsQueryResult['sessionUser']>['sponsoredMakers']['items']
	>([]);
	let balance = $state(0);
	let grantAt = $state<string | null>(null);
	let loading = $state(true);
	let error = $state(false);

	$effect(() => {
		loading = true;
		error = false;

		fetchQuery()
			.GetSponsorships()
			.then((res) => {
				sponsorships = res.sessionUser?.sponsoredMakers.items ?? [];
				balance = res.sessionUser?.spendAcct?.current?.balance ?? 0;
				grantAt = res.sessionUser?.grantAt ?? null;
			})
			.catch(() => {
				error = true;
			})
			.finally(() => {
				loading = false;
			});
	});

	const dateFmt = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });

	const recipients = $derived(sponsorships.length);
	const perRecipientCents = $derived(
		recipients > 0 ? Math.floor(balance / recipients) : 0
	);
	function formatDate(value: unknown) {
		return value ? dateFmt.format(new Date(String(value))) : '—';
	}
</script>

<svelte:head><title>Sponsorships | Feed The News</title></svelte:head>

<MainLayout>
	<MemberContent title="Sponsorships" {loading}>
		{#if error}
			<p class="mt-8 text-sm text-red-600">Could not load your sponsorships. Please try again.</p>
		{:else}
			{#if !sessionUser?.isSubscriber}
				<p class="mt-8 text-sm text-stone-600">
					<a href="/member/subscription" class="font-medium text-stone-900 underline underline-offset-2 hover:text-stone-700">
						Subscribe
					</a>
					to sponsor these users
				</p>
			{/if}
			{#if sponsorships.length > 0}
			<div class="mt-8 rounded-xl bg-white p-6 shadow-sm">
				<p class="text-sm text-stone-600">
					Current balance: <span class="font-semibold text-stone-900">${(balance / 100).toFixed(2)}</span>
				</p>
				<p class="mt-1 text-sm text-stone-600">
					{recipients} recipient{recipients === 1 ? '' : 's'} · ${(perRecipientCents / 100).toFixed(2)} each
				</p>
				{#if grantAt}
					<p class="mt-1 text-sm text-stone-600">
						To be transferred on {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(String(grantAt)))}
					</p>
				{/if}
			</div>
			<MakerList makers={sponsorships} />
		{:else}
			<p class="mt-8 text-sm text-stone-500">No active sponsorships</p>
			{/if}
		{/if}
	</MemberContent>
</MainLayout>
