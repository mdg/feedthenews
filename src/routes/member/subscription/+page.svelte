<script lang="ts">
	import MainLayout from '$lib/components/MainLayout.svelte';
	import Label from '$lib/components/Label.svelte';

	let { data } = $props();

	const insertedAt = $derived(
		data.subscription?.insertedAt
			? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(
					new Date(String(data.subscription.insertedAt))
				)
			: null
	);

	const tone = $derived(
		data.subscription?.status === 'ACTIVE'
			? 'green'
			: data.subscription?.status === 'CANCELLED'
				? 'red'
				: 'amber'
	);
</script>

<svelte:head><title>Subscription | Feed The News</title></svelte:head>

<MainLayout>
	<div class="mx-auto w-full max-w-2xl">
		<h1 class="font-serif text-3xl font-bold tracking-tight text-stone-900">Subscription</h1>

		{#if data.subscription}
			<dl
				class="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 rounded-xl bg-white p-6 shadow-sm sm:grid-cols-2"
			>
				<div>
					<dt class="text-sm font-medium text-stone-500">Amount</dt>
					<dd class="mt-1 text-sm font-semibold text-stone-900">${data.subscription.amt} / month</dd>
				</div>
				<div>
					<dt class="text-sm font-medium text-stone-500">Status</dt>
					<dd class="mt-1">
						<Label label={String(data.subscription.status).toLowerCase()} tone={tone} />
					</dd>
				</div>
				<div>
					<dt class="text-sm font-medium text-stone-500">Since</dt>
					<dd class="mt-1 text-sm font-semibold text-stone-900">{insertedAt ?? '—'}</dd>
				</div>
			</dl>
		{:else}
			<p class="mt-8 text-sm text-stone-500">No active subscription</p>
		{/if}
	</div>
</MainLayout>
