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
	const isBluesky = $derived(data.user.platformType === 'ATPROTO');

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
		{#if data.user.avatar}
			<img src={data.user.avatar} alt={`${name}'s avatar`} class="h-24 w-24 rounded-full object-cover" />
		{/if}
	<h1 class="font-serif text-3xl font-bold tracking-tight text-stone-900">
		@{name}{#if isBluesky}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
				class="ml-1 inline-block h-6 w-6 text-[#1185fe]"
				aria-label="Bluesky"
				role="img"
			>
				<path
					fill="currentColor"
					transform="translate(0,512) scale(0.1,-0.1)"
					d="M390 4706 c-136 -38 -201 -106 -247 -261 -25 -85 -24 -350 1 -645 2 -19 7 -71 10 -115 4 -44 9 -96 11 -115 2 -19 6 -71 10 -115 6 -84 23 -243 30 -285 2 -14 6 -52 10 -85 6 -53 13 -98 29 -171 11 -54 63 -166 111 -240 108 -167 281 -302 470 -369 28 -9 59 -21 70 -26 30 -13 181 -46 250 -55 33 -4 113 -8 177 -8 64 -1 114 -4 110 -7 -6 -4 -65 -17 -197 -43 -11 -2 -47 -11 -80 -21 -33 -9 -73 -20 -90 -24 -50 -14 -180 -68 -245 -103 -91 -49 -173 -119 -219 -188 -50 -75 -61 -112 -68 -217 -12 -180 93 -411 310 -681 222 -277 442 -450 663 -524 88 -29 233 -31 309 -4 180 64 333 229 473 511 77 155 189 454 247 664 19 67 29 76 39 34 9 -39 27 -100 91 -317 148 -494 305 -754 516 -850 74 -34 109 -40 219 -39 108 1 202 27 325 91 92 48 267 161 295 192 3 3 25 21 50 41 52 42 151 143 205 209 20 25 44 54 53 65 28 33 122 179 122 189 0 5 6 17 14 25 8 9 28 57 46 106 108 309 -13 558 -355 727 -130 65 -292 118 -435 144 -73 14 -54 19 68 20 254 1 468 53 660 160 241 135 421 396 447 649 4 38 8 72 10 75 2 5 5 28 20 168 3 23 7 61 10 85 2 23 7 74 11 112 3 39 7 86 9 105 2 19 7 76 10 125 4 50 8 106 10 125 20 204 26 480 13 558 -26 153 -80 247 -168 292 -203 104 -452 40 -817 -209 -131 -90 -162 -114 -248 -186 -319 -270 -683 -685 -967 -1105 -91 -134 -218 -344 -218 -360 0 -23 -18 -7 -39 36 -27 58 -135 231 -210 339 -64 93 -211 295 -226 311 -5 6 -21 26 -35 44 -14 18 -30 38 -35 44 -6 6 -39 46 -74 90 -124 152 -370 410 -511 536 -19 17 -44 39 -55 49 -218 194 -582 408 -762 446 -57 13 -189 13 -233 1z"
				/>
			</svg>
		{/if}
	</h1>

		{#if page.data.user && page.data.user.name !== name}
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
		{#if data.user.isMember}
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
		{#if data.user.countSponsoring > 0}
			<div>
				<dt class="text-sm font-medium text-stone-500">Sponsoring</dt>
				<dd class="mt-1 text-sm font-semibold text-stone-900">{data.user.countSponsoring}</dd>
			</div>
		{/if}
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
