<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import SignInModal from '$lib/components/SignInModal.svelte';

	let signInOpen = $state(false);
</script>

<svelte:head><title>Welcome | Feed The News</title></svelte:head>

<div class="min-h-screen bg-stone-100 text-stone-900">
	<Header onSignIn={() => (signInOpen = true)} />

	<main class="mx-auto w-full max-w-5xl px-6 py-24">
		<h1 class="font-serif text-5xl leading-tight font-black tracking-tight md:text-7xl">
			Basic Income for Your Favorite Journalists
		</h1>

		<p class="mt-8 max-w-2xl text-lg leading-relaxed text-stone-600">
			Feed The News connects readers directly with the journalists they trust. Your contributions
			provide a steady, sustainable income for the reporters covering the stories that matter — free
			from ad revenue, clickbait, and paywalls.
		</p>
	</main>
</div>

{#if signInOpen}
	<SignInModal onClose={() => (signInOpen = false)} />
{/if}
