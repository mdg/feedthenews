<script lang="ts">
	import { page } from '$app/state';
	import MainLayout from '$lib/components/MainLayout.svelte';
	import MemberContent from '$lib/components/MemberContent.svelte';
	import Label from '$lib/components/Label.svelte';
	import { fetchQuery, fetchMut } from '$lib/graph';
	import type { GetSubscriptionQueryResult } from '$lib/generated/query';
	import { SubscriptionStatus } from '$lib/generated/query';

	let { data: layoutData } = $props();

	const isSubscriber = $derived(layoutData.sessionUser?.isSubscriber ?? false);

	let subscription = $state<
		NonNullable<GetSubscriptionQueryResult['sessionUser']>['subscription']
	>(undefined);
	let loading = $state(true);
	let error = $state(false);
	let confirmOpen = $state(false);
	let cancelling = $state(false);
	let cancelError = $state(false);

	$effect(() => {
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

	async function cancelSubscription() {
		if (cancelling) return;

		const csrf = page.data.csrf_token as string | null;
		if (!csrf) {
			cancelError = true;
			confirmOpen = false;
			return;
		}

		cancelling = true;
		cancelError = false;

		try {
			await fetchMut(csrf).CancelSubscription();
			confirmOpen = false;
			subscription = subscription && { ...subscription, status: SubscriptionStatus.CANCELLED };
		} catch {
			cancelError = true;
		} finally {
			cancelling = false;
		}
	}

	const insertedAt = $derived(
		subscription?.insertedAt
			? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
					new Date(String(subscription.insertedAt))
				)
			: null
	);

	const statusAtLabel = $derived(
		subscription?.statusAt
			? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
					new Date(String(subscription.statusAt))
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

	const isActive = $derived(subscription?.status === 'ACTIVE');
</script>

<svelte:head><title>Subscription | Feed The News</title></svelte:head>

<MainLayout>
	<MemberContent title="Subscription" {loading}>
		{#if error}
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
					<dt class="text-sm font-medium text-stone-500">Created</dt>
					<dd class="mt-1 text-sm font-semibold text-stone-900">{insertedAt ?? '—'}</dd>
				</div>
				<div>
					<dt class="text-sm font-medium text-stone-500">Status</dt>
					<dd class="mt-1">
						<Label label={String(subscription.status).toLowerCase()} tone={tone} />
					</dd>
				</div>
				<div>
					<dt class="text-sm font-medium text-stone-500">
						{subscription.status === 'CANCELLED' ? 'Cancelled At' : 'Activated At'}
					</dt>
					<dd class="mt-1 text-sm font-semibold text-stone-900">{statusAtLabel ?? '—'}</dd>
				</div>
			</dl>

			{#if isActive && !confirmOpen}
				<div class="mt-4">
					<button
						type="button"
						onclick={() => (confirmOpen = true)}
						class="rounded-md border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900"
					>
						Cancel Subscription
					</button>
				</div>
			{:else if confirmOpen}
				<div class="mt-4 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
					<p class="text-sm text-stone-600">
						Are you sure you want to cancel your subscription? Your sponsorships will stop.
					</p>
					{#if cancelError}
						<p class="mt-2 text-sm text-red-600">
							Could not cancel your subscription. Please try again.
						</p>
					{/if}
					<div class="mt-4 flex items-center gap-3">
						<button
							type="button"
							disabled={cancelling}
							onclick={cancelSubscription}
							class="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{cancelling ? 'Cancelling…' : 'Yes, Cancel Subscription'}
						</button>
						<button
							type="button"
							disabled={cancelling}
							onclick={() => (confirmOpen = false)}
							class="rounded-md border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100"
						>
							Keep Subscription
						</button>
					</div>
				</div>
			{/if}
		{:else}
			<div class="mt-8 rounded-xl bg-white p-8 text-center shadow-sm">
				<p class="text-sm text-stone-600">You don't have a subscription.</p>
				<a
					href="/member/subscribe"
					class="mt-4 inline-block rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-700"
				>
					Subscribe
				</a>
			</div>
		{/if}
	</MemberContent>
</MainLayout>
