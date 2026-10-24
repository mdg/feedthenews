<script lang="ts">
	import { page } from '$app/state';
	import MainLayout from '$lib/components/MainLayout.svelte';
	import MemberContent from '$lib/components/MemberContent.svelte';
	import Label from '$lib/components/Label.svelte';
	import { fetchQuery, fetchMut } from '$lib/graph';
	import type { GetSubscriptionQueryResult } from '$lib/generated/query';
	import { SubscriptionStatus } from '$lib/generated/query';
	import UserTxList from '$lib/components/UserTxList.svelte';
	import type { UserTx } from '$lib/generated/query';

	let { data: layoutData } = $props();

	const isSubscriber = $derived(layoutData.sessionUser?.isSubscriber ?? false);

	let subscription = $state<
		NonNullable<GetSubscriptionQueryResult['sessionUser']>['subscription']
	>(undefined);
	let isStripeCustomer = $state(false);
	let transactions = $state<UserTx[]>([]);
	let loading = $state(true);
	let error = $state(false);
	let confirmOpen = $state(false);
	let cancelling = $state(false);
	let cancelError = $state(false);

	const amounts = [5, 10, 20];
	let selectedAmount = $state(10);
	let otherAmount = $state<number | null>(null);
	let subscribing = $state(false);
	let subscribeError = $state(false);

	const subscribeAmount = $derived(
		selectedAmount > 0
			? selectedAmount
			: Math.min(50, Math.max(6, otherAmount || 30))
	);

	async function subscribe() {
		const amt = subscribeAmount;
		if (!amt || subscribing) return;

		const csrf = page.data.csrf_token as string | null;
		if (!csrf) {
			subscribeError = true;
			return;
		}

		subscribing = true;
		subscribeError = false;

		try {
			const res = await fetchMut(csrf).Subscribe({ amtCents: Math.round(amt * 100) });
			const checkoutUrl = res.sessionUser?.subscribe.checkoutUrl;

			if (checkoutUrl) {
				window.location.href = checkoutUrl;
				return;
			}

			await fetchQuery()
				.GetSubscription()
				.then((res) => {
					subscription = res.sessionUser?.subscription ?? null;
					isStripeCustomer = res.sessionUser?.isStripeCustomer ?? false;
					transactions = res.sessionUser?.subscription?.transactions.items ?? [];
				});
		} catch {
			subscribeError = true;
		} finally {
			subscribing = false;
		}
	}

	$effect(() => {
		error = false;

		fetchQuery()
			.GetSubscription()
			.then((res) => {
				subscription = res.sessionUser?.subscription ?? null;
				isStripeCustomer = res.sessionUser?.isStripeCustomer ?? false;
				transactions = res.sessionUser?.subscription?.transactions?.items ?? [];
			})
			.catch(() => {
				error = true;
			})
			.finally(() => {
				loading = false;
			});
	});

	async function openStripeAccount() {
		const csrf = page.data.csrf_token as string | null;
		if (!csrf) return;
		try {
			const res = await fetchMut(csrf).StripeSession();
			const url = res.sessionUser?.stripeSession;
			if (url) window.open(url, '_blank');
		} catch {}
	}

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
		<div>
			{#snippet subscribeForm()}
	<div class="mt-8 rounded-xl bg-white p-6 shadow-sm">
		<p class="text-sm text-stone-600">
			{subscription
				? 'Your subscription was cancelled. Subscribe again to resume sponsoring journalists.'
				: 'Subscribe to start sponsoring your favorite journalists.'}
		</p>

		<div class="mt-4 flex flex-wrap items-center gap-2">
			{#each amounts as amount (amount)}
				<button
					type="button"
					onclick={() => (selectedAmount = amount)}
					class="rounded-md border px-4 py-2 text-sm font-medium {selectedAmount === amount
						? 'border-stone-900 bg-stone-900 text-stone-50'
						: 'border-stone-300 text-stone-700 hover:bg-stone-100'}"
				>
					${amount}
				</button>
			{/each}
				<button
					type="button"
					class="flex items-center gap-2 rounded-md border border-stone-300 px-3 py-2 {selectedAmount === 0
						? 'border-stone-900 ring-1 ring-stone-900'
						: ''}"
					onclick={(e) => {
						selectedAmount = 0;
						otherAmount = otherAmount || 30;
						(e.currentTarget.querySelector('input') as HTMLInputElement | null)?.focus();
					}}
				>
					<span class="text-sm text-stone-700">Other $</span>
					<input
						type="number"
						min="6"
						max="50"
						placeholder="30"
						bind:value={otherAmount}
						onclick={(e) => {
						e.stopPropagation();
						selectedAmount = 0;
						otherAmount = otherAmount || 30;
					}}
						onfocus={() => {
						selectedAmount = 0;
						otherAmount = otherAmount || 30;
					}}
						class="w-16 rounded border-stone-300 text-sm shadow-sm focus:border-stone-500 focus:ring-stone-500"
					/>
				</button>
		</div>

		{#if subscribeError}
			<p class="mt-2 text-sm text-red-600">Could not subscribe. Please try again.</p>
		{/if}

		<div class="mt-4">
			<button
				type="button"
				disabled={!subscribeAmount || subscribing}
				onclick={subscribe}
				class="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{subscribing ? 'Subscribing…' : 'Subscribe'}
			</button>
		</div>
	</div>
			{/snippet}

			{#if error}
			<p class="mt-8 text-sm text-red-600">Could not load your subscription. Please try again.</p>
		{:else if subscription}
			<div class="mt-8 rounded-xl bg-white p-6 shadow-sm">
				<dl class="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
				<div>
					<dt class="text-sm font-medium text-stone-500">Monthly amount</dt>
					<dd class="mt-1 text-sm font-semibold text-stone-900">${subscription.amt / 100} / month</dd>
				</div>
					<!-- insertedAt: {subscription?.insertedAt ?? ''} -->
				<div>
					<dt class="text-sm font-medium text-stone-500">Status</dt>
					<dd class="mt-1">
						<Label label={String(subscription.status).toLowerCase()} tone={tone} />
					</dd>
				</div>
				<div>
					<dt class="text-sm font-medium text-stone-500">
						{subscription.status === 'PENDING'
							? 'Created On'
							: subscription.status === 'ACTIVE'
								? 'Activated On'
								: subscription.status === 'CANCELLED'
									? 'Cancelled On'
									: 'Status At'}
					</dt>
					<dd class="mt-1 text-sm font-semibold text-stone-900">{statusAtLabel ?? '—'}</dd>
				</div>
			</dl>

			<div class="mt-4 flex items-center justify-between">
				<div class="flex items-center gap-3">
					{#if subscription?.status === 'PENDING' && subscription?.checkoutUrl}
						<button
							type="button"
							onclick={() => (window.location.href = String(subscription?.checkoutUrl))}
							class="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-700"
						>
							Activate Subscription
						</button>
					{:else if isStripeCustomer}
						<button
							type="button"
							onclick={openStripeAccount}
							class="rounded-md border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900"
						>
							See Stripe Account
						</button>
					{/if}
				</div>
				{#if isActive && !confirmOpen}
					<button
						type="button"
						onclick={() => (confirmOpen = true)}
						class="rounded-md border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900"
					>
						Cancel Subscription
					</button>
				{/if}
			</div>
			</div>

			{#if confirmOpen}
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
			{#if subscription.status === SubscriptionStatus.CANCELLED}
				{@render subscribeForm()}
			{/if}

			{#if transactions.length}
				<div class="mt-8 rounded-xl bg-white p-6 shadow-sm">
					<h2 class="text-sm font-medium text-stone-500">Transactions</h2>
					<UserTxList {transactions} />
				</div>
			{/if}
		{:else}
			{@render subscribeForm()}
		{/if}
		</div>
	</MemberContent>
</MainLayout>
