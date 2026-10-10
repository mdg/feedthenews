<script lang="ts">
	import { page } from '$app/state';
	import MainLayout from '$lib/components/MainLayout.svelte';
	import SignInModal from '$lib/components/SignInModal.svelte';
	import ToggleButton from '$lib/components/ToggleButton.svelte';
	import Username from '$lib/components/Username.svelte';
	import { fetchMut } from '$lib/graph';
	import { PlatformType } from '$lib/generated/query';

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

<MainLayout onSignIn={() => (signInOpen = true)}>
	<div class="mx-auto w-full max-w-2xl">
		<section class="rounded-xl bg-white p-8 shadow-sm">
			<div class="flex flex-col gap-6 sm:flex-row sm:items-start">
				{#if data.profile.avatar}
					<img
						src={data.profile.avatar}
						alt={`${name}'s avatar`}
						class="h-20 w-20 shrink-0 rounded-full object-cover ring-1 ring-stone-200"
					/>
				{/if}

				<div class="min-w-0">
					<div class="flex flex-wrap items-center gap-3">
						<h1 class="font-serif text-3xl font-bold tracking-tight text-stone-900">
							<Username name={name} platformType={data.profile.platformType} />
						</h1>
						{#if data.profile.isMember}
							<span
								class="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="h-3.5 w-3.5"
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
						{/if}
					</div>

					{#if data.profile.description}
						<p class="mt-3 line-clamp-3 text-sm leading-relaxed text-stone-600" title={data.profile.description}>
							{data.profile.description}
						</p>
					{/if}
				</div>
			</div>

			<dl class="mt-8 grid grid-cols-3 divide-x divide-stone-200">
				<div class="px-4 text-center sm:px-6">
					<dt class="text-xs font-medium uppercase tracking-wide text-stone-500">Sponsoring</dt>
					<dd class="mt-1 text-2xl font-bold text-stone-900">
						{data.profile.countSponsoring > 0 ? data.profile.countSponsoring : '—'}
					</dd>
				</div>
				<div class="px-4 text-center sm:px-6">
					<dt class="text-xs font-medium uppercase tracking-wide text-stone-500">Sponsors</dt>
					<dd class="mt-1 text-2xl font-bold text-stone-900">
						{data.profile.isMaker && data.profile.countSponsors > 0 ? data.profile.countSponsors : '—'}
					</dd>
				</div>
				<div class="px-4 text-center sm:px-6">
					<dt class="text-xs font-medium uppercase tracking-wide text-stone-500">Subscriber</dt>
					<dd class="mt-1 text-2xl font-bold text-stone-900">
						{data.profile.isMember ? 'Yes' : '—'}
					</dd>
				</div>
			</dl>

			{#if (page.data.sessionUser && page.data.sessionUser.name !== name) || data.profile.isMaker || data.profile.platformType === PlatformType.ATPROTO}
				<div class="mt-8 flex flex-wrap items-center gap-3 border-t border-stone-200 pt-6">
					{#if page.data.sessionUser && page.data.sessionUser.name !== name}
						<ToggleButton active={sponsored} disabled={submitting} onclick={toggleSponsor}>
							{sponsored ? 'Sponsored' : 'Sponsor'}
						</ToggleButton>
					{/if}
					{#if data.profile.isMaker && patreonName}
						<a
							href={`https://www.patreon.com/${patreonName}`}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-block rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-700"
						>
							Subscribe on Patreon
						</a>
					{/if}
					{#if data.profile.platformType === PlatformType.ATPROTO}
						<a
							href={`https://bsky.app/profile/${name}`}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-block text-sm font-medium text-[#1185fe] hover:underline"
						>
							Open Bluesky
						</a>
					{/if}
				</div>
				{#if status}
					<p class="mt-2 text-sm text-red-600">{status.message}</p>
				{/if}
			{/if}
		</section>
	</div>
</MainLayout>

{#if signInOpen}
	<SignInModal onClose={() => (signInOpen = false)} />
{/if}
