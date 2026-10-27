<script lang="ts">
	import { page } from '$app/state';
	import MainLayout from '$lib/components/MainLayout.svelte';
	import MemberContent from '$lib/components/MemberContent.svelte';
	import Label from '$lib/components/Label.svelte';
	import Username from '$lib/components/Username.svelte';
	import { fetchQuery } from '$lib/graph';
	import type { GetSponsorshipsQueryResult } from '$lib/generated/query';

	const sessionUser = $derived(page.data.sessionUser);

	let sponsorships = $state<
		NonNullable<GetSponsorshipsQueryResult['sessionUser']>['sponsoredMakers']['items']
	>([]);
	let balance = $state(0);
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
			</div>
			<ul class="mt-8 divide-y divide-stone-200 rounded-xl bg-white shadow-sm">
				{#each sponsorships as sponsorship, i (i)}
					<li class="flex items-center gap-4 px-6 py-4">
						{#if sponsorship.avatar}
							<img
								src={sponsorship.avatar}
								alt={`${sponsorship.name}'s avatar`}
								class="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-stone-200"
							/>
						{/if}

						<div class="min-w-0 flex-1">
							<a
								href={`/@${sponsorship.name ?? ''}`}
								class="text-sm font-semibold text-stone-900 hover:underline"
							>
								<Username
									name={sponsorship.name ?? 'Unknown'}
									platformType={sponsorship.platformType ?? ''}
								/>
							</a>
							<p class="mt-0.5 text-xs text-stone-500">
								Since {formatDate(sponsorship.sessionUserSponsorship?.statusAt)}
							</p>
						</div>

						<div class="flex shrink-0 items-center gap-1.5">
							{#if sponsorship.sessionUserSponsorship?.anonymous}
								<Label label="Anonymous" tone="amber" />
							{/if}
							{#if sponsorship.sessionUserSponsorship?.matching}
								<Label label="Matching" tone="stone" />
							{/if}
							<Label
								label={String(sponsorship.sessionUserSponsorship?.status ?? '').toLowerCase()}
								tone={sponsorship.sessionUserSponsorship?.status === 'ACTIVE' ? 'green' : 'stone'}
							/>
						</div>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="mt-8 text-sm text-stone-500">No active sponsorships</p>
			{/if}
		{/if}
	</MemberContent>
</MainLayout>
