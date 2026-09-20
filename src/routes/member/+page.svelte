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

	const sponsorships = $derived(
		(data.dashboard.user?.sponsorships ?? []).filter((s) => s != null)
	);
	const dateFmt = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });
	function formatDate(value: unknown) {
		return value ? dateFmt.format(new Date(String(value))) : '—';
	}
</script>

<svelte:head><title>Dashboard | Feed The News</title></svelte:head>

<div class="min-h-screen">
	<Header onSignIn={() => (signInOpen = true)} />

	<main class="mx-auto w-full max-w-5xl px-6 py-12">
		<h1 class="font-serif text-3xl font-bold tracking-tight text-stone-900">
			{page.data.user?.name}
		</h1>

		{#if sponsorships.length > 0}
			<section class="mt-8">
				<h2 class="font-serif text-xl font-bold tracking-tight text-stone-900">Sponsorships</h2>
				<table class="mt-4 max-w-md rounded-lg bg-white shadow-sm text-sm">
					<thead>
						<tr class="border-b border-stone-200 text-left">
							<th scope="col" class="px-6 py-3 font-medium text-stone-500">Recipient</th>
							<th scope="col" class="w-32 px-6 py-3 text-center font-medium text-stone-500">Anonymous</th>
							<th scope="col" class="w-40 px-6 py-3 font-medium text-stone-500">Since</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-stone-200">
						{#each sponsorships as sponsorship (sponsorship.maker?.name)}
							<tr>
								<td class="px-6 py-4 font-semibold text-stone-900">
									{sponsorship.maker?.name ?? 'Unknown'}
								</td>
								<td class="px-6 py-4 text-center">
									<input
										type="checkbox"
										checked={sponsorship.anonymous ?? false}
										disabled
										class="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-500"
									/>
								</td>
								<td class="whitespace-nowrap px-6 py-4 text-stone-500">
									{formatDate(sponsorship.insertedAt)}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</section>
		{/if}

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
