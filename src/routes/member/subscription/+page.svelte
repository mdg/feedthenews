<script lang="ts">
	import { page } from '$app/state';
	import MainLayout from '$lib/components/MainLayout.svelte';
	import Label from '$lib/components/Label.svelte';
	import { fetchQuery } from '$lib/graph';
	import type { GetSubscriptionQueryResult } from '$lib/generated/query';

	let { data: layoutData } = $props();

	const isSubscriber = $derived(layoutData.sessionUser?.isSubscriber ?? false);

	let subscription = $state<
		NonNullable<GetSubscriptionQueryResult['sessionUser']>['subscription']
	>(undefined);
	let loading = $state(false);
	let error = $state(false);

	$effect(() => {
		if (!isSubscriber) return;

		loading = true;
		error = false;

		fetchQuery()
			.GetSubscription()
			.then((res) => {
				subscription = res.sessionUser?.subscription ?? null;
			})
			.catch(() => {
				error = true;
			})
			.finally(() => {
				loading = false;
			});
	});

	const insertedAt = $derived(
		subscription?.insertedAt
			? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
					new Date(String(subscription.insertedAt))
				)
			: null
	);

	const tone = $derived(
		subscription?.status === 'ACTIVE'
			? 'green'
			: subscription?.status === 'CANCELLED'
				? 'red'
				: 'amber'
	);
</script>

<svelte:head><title>Subscription | Feed The News</title></svelte:head>

<MainLayout>
	<div class="mx-auto w-full max-w-2xl">
		<h1 class="font-serif text-3xl font-bold tracking-tight text-stone-900">Subscription</h1>

		{#if !isSubscriber}
			<div class="mt-8 rounded-xl bg-white p-8 text-center shadow-sm">
				<p class="text-sm text-stone-600">You don't have an active subscription.</p>
				<a
					href="/member/subscribe"
					class="mt-4 inline-block rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-700"
				>
					Subscribe
				</a>
			</div>
		{:else if loading}
			<p class="mt-8 text-sm text-stone-500">Loading…</p>
		{:else if error}
			<p class="mt-8 text-sm text-red-600">Could not load your subscription. Please try again.</p>
		{:else if subscription}
			<dl
				class="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 rounded-xl bg-white p-6 shadow-sm sm:grid-cols-2"
			>
				<div>
					<dt class="text-sm font-medium text-stone-500">Monthly amount</dt>
					<dd class="mt-1 text-sm font-semibold text-stone-900">${subscription.amt} / month</dd>
				</div>
				<div>
					<dt class="text-sm font-medium text-stone-500">Status</dt>
					<dd class="mt-1">
						<Label label={String(subscription.status).toLowerCase()} tone={tone} />
					</dd>
				</div>
				<div>
					<dt class="text-sm font-medium text-stone-500">Since</dt>
					<dd class="mt-1 text-sm font-semibold text-stone-900">{insertedAt ?? '—'}</dd>
				</div>
			</dl>
		{/if}
	</div>
</MainLayout>
