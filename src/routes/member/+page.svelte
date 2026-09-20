<script lang="ts">
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import SignInModal from '$lib/components/SignInModal.svelte';

	let { data } = $props();
	let signInOpen = $state(false);

	const insertedAt = $derived(data.dashboard.user?.subscription?.insertedAt ?? null);
	const insertedAtLabel = $derived(
		insertedAt ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(insertedAt)) : null
	);
</script>

<svelte:head><title>Dashboard | Feed The News</title></svelte:head>

<div class="min-h-screen">
	<Header onSignIn={() => (signInOpen = true)} />

	<main class="mx-auto w-full max-w-5xl px-6 py-12">
		<h1 class="font-serif text-3xl font-bold tracking-tight text-stone-900">
			{page.data.user?.name}
		</h1>

		{#if data.dashboard.user?.subscription}
			<section class="mt-8">
				<h2 class="font-serif text-xl font-bold tracking-tight text-stone-900">Subscription</h2>
				<dl
					class="mt-4 grid max-w-md grid-cols-1 gap-x-8 gap-y-4 rounded-lg bg-white p-6 shadow-sm sm:grid-cols-2"
				>
					<div>
						<dt class="text-sm font-medium text-stone-500">Monthly amount</dt>
						<dd class="mt-1 text-sm font-semibold text-stone-900">
							${data.dashboard.user.subscription.amt} / month
						</dd>
					</div>
					<div>
						<dt class="text-sm font-medium text-stone-500">Status</dt>
						<dd class="mt-1 text-sm font-semibold text-stone-900">
							{data.dashboard.user.subscription.status}
						</dd>
					</div>
					<div>
						<dt class="text-sm font-medium text-stone-500">Since</dt>
						<dd class="mt-1 text-sm font-semibold text-stone-900">
							{insertedAtLabel}
						</dd>
					</div>
				</dl>
			</section>
		{/if}
	</main>
</div>

{#if signInOpen}
	<SignInModal onClose={() => (signInOpen = false)} />
{/if}
