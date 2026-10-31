<script lang="ts">
	import { page } from '$app/state';
	import MainLayout from '$lib/components/MainLayout.svelte';
	import MemberContent from '$lib/components/MemberContent.svelte';
	import SignInModal from '$lib/components/SignInModal.svelte';
	import Amt from '$lib/components/Amt.svelte';
	import { fetchQuery } from '$lib/graph';
	import type { GetDashboardQueryResult } from '$lib/generated/query';

	let signInOpen = $state(false);

	const sessionUser = $derived(page.data.sessionUser);

	let dashboard = $state<GetDashboardQueryResult | undefined>(undefined);
	let loading = $state(true);
	let error = $state(false);

	$effect(() => {
		loading = true;
		error = false;

		fetchQuery()
			.GetDashboard()
			.then((res) => {
				dashboard = res;
			})
			.catch(() => {
				error = true;
			})
			.finally(() => {
				loading = false;
			});
	});

	const insertedAt = $derived(dashboard?.sessionUser?.subscription?.insertedAt ?? null);
	const insertedAtLabel = $derived(
		insertedAt
			? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(insertedAt))
			: null
	);

	const sponsorships = $derived(dashboard?.sessionUser?.sponsoredMakers.items ?? []);
	const sponsors = $derived(
		(dashboard?.sessionMaker?.sponsors.items ?? []).map((s: any) => s.name)
	);
	const dateFmt = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });
	function formatDate(value: unknown) {
		return value ? dateFmt.format(new Date(String(value))) : '—';
	}
</script>

<svelte:head><title>Dashboard | Feed The News</title></svelte:head>

<MainLayout>
	<MemberContent title="Dashboard" {loading}>
		{#if error}
			<p class="mt-8 text-sm text-red-600">Could not load your dashboard. Please try again.</p>
		{:else}
			<section class="mt-8 space-y-4 rounded-xl bg-white p-6 shadow-sm">
				{#if sessionUser?.isSubscriber && insertedAtLabel}
					<p class="text-sm text-stone-600">
						Subscriber since {insertedAtLabel}
					</p>
				{:else if !sessionUser?.isSubscriber}
					<p class="text-sm text-stone-600">
						<a href="/member/subscription" class="font-medium text-stone-900 underline underline-offset-2 hover:text-stone-700">
							Subscribe now to sponsor your favorite journalists
						</a>
					</p>
				{/if}

				{#if sponsorships.length > 0}
					<p class="text-sm text-stone-600">
						Sponsoring
						<a
							href="/member/sponsorships"
							class="font-medium text-stone-900 underline underline-offset-2 hover:text-stone-700"
							>{sponsorships.length} journalist{sponsorships.length === 1 ? '' : 's'}</a
						> with
						<span class="font-semibold text-stone-900"
							><Amt cents={dashboard?.sessionUser?.spendAcct?.current?.balance ?? 0} /></span
						>
						{#if dashboard?.sessionUser?.grantAt}
							to be transferred on {formatDate(dashboard.sessionUser.grantAt)}
						{/if}
					</p>
				{:else}
					<p class="text-sm text-stone-600">
						<a href="/discover" class="font-medium text-stone-900 underline underline-offset-2 hover:text-stone-700">
							Find journalists to sponsor
						</a>
					</p>
				{/if}

				{#if dashboard?.sessionUser?.isMaker}
					<p class="text-sm text-stone-600">
						{sponsors.length} sponsor{sponsors.length === 1 ? '' : 's'}
					</p>
					{#if dashboard?.sessionUser?.patreon}
						<p class="text-sm text-stone-600">
							Patreon Username:
							<a
								href={`https://www.patreon.com/${dashboard.sessionUser.patreon.replace(/^https?:\/\/(www\.)?patreon\.com\//i, '').replace(/\/+$/, '')}`}
								target="_blank"
								rel="noopener noreferrer"
								class="font-medium text-stone-900 underline underline-offset-2 hover:text-stone-700"
							>
								{dashboard.sessionUser.patreon.replace(/^https?:\/\/(www\.)?patreon\.com\//i, '').replace(/\/+$/, '')}
							</a>
						</p>
					{/if}
				{/if}
			</section>

			{#if dashboard?.sessionMaker}
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
		{/if}
	</MemberContent>
</MainLayout>

{#if signInOpen}
	<SignInModal onClose={() => (signInOpen = false)} />
{/if}
