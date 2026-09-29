<script lang="ts">
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import SignInModal from '$lib/components/SignInModal.svelte';
	import ToggleButton from '$lib/components/ToggleButton.svelte';
	import { fetchMut } from '$lib/graph';

	let { data } = $props();

	let signInOpen = $state(false);
	let sponsored = $state((() => data.user.sessionUser?.sponsored ?? false)());
	let submitting = $state(false);
	let status: { kind: 'error'; message: string } | null = $state(null);

	const name = $derived(data.user.name);

	async function toggleSponsor() {
		if (submitting) return;

		const csrf = page.data.csrf_token as string | null;
		if (!csrf) {
			status = { kind: 'error', message: 'Session expired. Please sign in again.' };
			return;
		}

		submitting = true;
		status = null;

		try {
			if (sponsored) {
				await fetchMut(csrf).CancelSponsorship({ maker: data.user.name });
				sponsored = false;
			} else {
				await fetchMut(csrf).Sponsor({ maker: data.user.name });
				sponsored = true;
			}
		} catch {
			status = { kind: 'error', message: 'Could not update your sponsorship. Please try again.' };
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head><title>{name} | Feed The News</title></svelte:head>

<div class="min-h-screen">
	<Header onSignIn={() => (signInOpen = true)} />

	<main class="mx-auto w-full max-w-5xl px-6 py-12">
		<h1 class="font-serif text-3xl font-bold tracking-tight text-stone-900">
			@{name}
		</h1>

		{#if page.data.user}
			<div class="mt-8 max-w-md">
				<div class="flex justify-end">
					<ToggleButton active={sponsored} disabled={submitting} onclick={toggleSponsor}>
						{sponsored ? 'Sponsored' : 'Sponsor'}
					</ToggleButton>
				</div>
				{#if status}
					<p class="mt-2 text-sm text-red-600">{status.message}</p>
				{/if}
			</div>
		{/if}

		<dl
			class="mt-4 grid max-w-md grid-cols-1 gap-x-8 gap-y-4 rounded-lg bg-white p-6 shadow-sm sm:grid-cols-2"
		>
			<div>
				<dt class="text-sm font-medium text-stone-500">Subscriber</dt>
				<dd class="mt-1 text-sm font-semibold text-stone-900">
					{data.user.isSubscriber ? 'Yes' : 'No'}
				</dd>
			</div>
			<div>
				<dt class="text-sm font-medium text-stone-500">Sponsoring</dt>
				<dd class="mt-1 text-sm font-semibold text-stone-900">{data.user.countSponsoring}</dd>
			</div>
			{#if data.user.isMaker}
				<div>
					<dt class="text-sm font-medium text-stone-500">Sponsors</dt>
					<dd class="mt-1 text-sm font-semibold text-stone-900">{data.user.countSponsors}</dd>
				</div>
			{/if}
		</dl>
	</main>
</div>

{#if signInOpen}
	<SignInModal onClose={() => (signInOpen = false)} />
{/if}
