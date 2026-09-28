<script lang="ts">
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import SignInModal from '$lib/components/SignInModal.svelte';

	let { data } = $props();

	let signInOpen = $state(false);

	const name = $derived(data.user.name ?? page.params.user);
</script>

<svelte:head><title>{name} | Feed The News</title></svelte:head>

<div class="min-h-screen">
	<Header onSignIn={() => (signInOpen = true)} />

	<main class="mx-auto w-full max-w-5xl px-6 py-12">
		<h1 class="font-serif text-3xl font-bold tracking-tight text-stone-900">
			@{name}
		</h1>

		<dl
			class="mt-8 grid max-w-md grid-cols-1 gap-x-8 gap-y-4 rounded-lg bg-white p-6 shadow-sm sm:grid-cols-2"
		>
			<div>
				<dt class="text-sm font-medium text-stone-500">Subscriber</dt>
				<dd class="mt-1 text-sm font-semibold text-stone-900">
					{data.user.isSubscriber ? 'Yes' : 'No'}
				</dd>
			</div>
			<div>
				<dt class="text-sm font-medium text-stone-500">Sponsoring</dt>
				<dd class="mt-1 text-sm font-semibold text-stone-900">{data.user.countSponsoring ?? 0}</dd>
			</div>
			<div>
				<dt class="text-sm font-medium text-stone-500">Sponsors</dt>
				<dd class="mt-1 text-sm font-semibold text-stone-900">{data.user.countSponsors ?? 0}</dd>
			</div>
		</dl>
	</main>
</div>

{#if signInOpen}
	<SignInModal onClose={() => (signInOpen = false)} />
{/if}
