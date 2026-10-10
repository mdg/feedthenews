<script lang="ts">
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import SignInModal from '$lib/components/SignInModal.svelte';
	import ToggleButton from '$lib/components/ToggleButton.svelte';
	import Username from '$lib/components/Username.svelte';
	import { fetchMut } from '$lib/graph';

	let { data } = $props();

	let signInOpen = $state(false);
	let sponsored = $state((() => data.profile.sessionUser?.sponsored ?? false)());
	let submitting = $state(false);
	let status: { kind: 'error'; message: string } | null = $state(null);

	const name = $derived(data.profile.name);
	const patreonName = $derived(
		data.profile.patreon?.replace(/^https?:\/\/(www\.)?patreon\.com\//i, '').replace(/\/+$/, '') ??
			null
	);

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
				await fetchMut(csrf).CancelSponsorship({ maker: data.profile.name });
				sponsored = false;
			} else {
				await fetchMut(csrf).Sponsor({ maker: data.profile.name });
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
		{#if data.profile.avatar}
			<img src={data.profile.avatar} alt={`${name}'s avatar`} class="h-24 w-24 rounded-full object-cover" />
		{/if}
	<h1 class="font-serif text-3xl font-bold tracking-tight text-stone-900">
		<Username name={name} platformType={data.profile.platformType} />
	</h1>

		{#if page.data.sessionUser && page.data.sessionUser.name !== name}
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
		{#if data.profile.isMember}
			<div>
				<dt class="text-sm font-medium text-stone-500">
					<span
						class="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-amber-800"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="h-4 w-4"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.8L10 14.77l-5.2 2.74.99-5.8-4.21-4.1 5.82-.85L10 1.5z"
								clip-rule="evenodd"
							/>
						</svg>
						Subscriber
					</span>
				</dt>
			</div>
		{/if}
		{#if data.profile.countSponsoring > 0}
			<div>
				<dt class="text-sm font-medium text-stone-500">Sponsoring</dt>
				<dd class="mt-1 text-sm font-semibold text-stone-900">{data.profile.countSponsoring}</dd>
			</div>
		{/if}
			{#if data.profile.isMaker}
				<div>
					<dt class="text-sm font-medium text-stone-500">Sponsors</dt>
					<dd class="mt-1 text-sm font-semibold text-stone-900">{data.profile.countSponsors}</dd>
				</div>
			{/if}
		</dl>

		{#if data.profile.isMaker && patreonName}
			<a
				href={`https://www.patreon.com/${patreonName}`}
				target="_blank"
				rel="noopener noreferrer"
				class="mt-4 inline-block rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-700"
			>
				Subscribe on Patreon
			</a>
		{/if}
	</main>
</div>

{#if signInOpen}
	<SignInModal onClose={() => (signInOpen = false)} />
{/if}
