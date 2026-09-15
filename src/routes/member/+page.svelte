<script lang="ts">
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import SignInModal from '$lib/components/SignInModal.svelte';

	let signInOpen = $state(false);
</script>

<svelte:head><title>Dashboard | Feed The News</title></svelte:head>

<div class="min-h-screen">
	<Header onSignIn={() => (signInOpen = true)} />

	<main class="mx-auto w-full max-w-5xl px-6 py-12">
		<h1 class="font-serif text-3xl font-bold tracking-tight text-stone-900">
			{page.data.user?.name}
		</h1>
	</main>
</div>

{#if signInOpen}
	<SignInModal onClose={() => (signInOpen = false)} />
{/if}
