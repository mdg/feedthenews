<script lang="ts">
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import SignInModal from '$lib/components/SignInModal.svelte';
	import routing from '$lib/assets/routing.png';

	let signInOpen = $state(false);
</script>

<svelte:head><title>Welcome | Feed The News</title></svelte:head>

<div class="min-h-screen">
	<Header onSignIn={() => (signInOpen = true)} />

	<main class="mx-auto w-full max-w-5xl px-6 py-24">
		<h1 class="font-serif text-4xl leading-tight font-black tracking-tight md:text-5xl">
			Basic Income for Your Favorite Journalists
		</h1>

		<div class="mt-8 max-w-2xl space-y-6 text-lg leading-relaxed text-stone-600">
			<p>
				Local newspapers are doing regular layoffs, going digital-only, or often closing entirely.
				Our favorite journalists are left to go independent, trying to do the same great reporting
				without the same resources supporting them.
			</p>

			<p>
				The best way to support journalists and their
				publications is to subscribe to their work.
				But the reality is that most of us can't afford
				to subscribe to everything. With so many
				people going independent, the number of potential
				subscriptions can become overwhelming.
			</p>

			<p>
				Feed The News tries to address this problem
				with crowdfunding by
				letting you take a little extra money each
				month and give it to your favorite journalists.
				However much you want to give, we take care
				of distributing it to each of the people you want to
				fund. Then we take all the money given
				to each recipient and provide them a single payment.
			</p>

			<p>
				Here's an example of what it might look like for 3
				fans of US Soccer supporting 5 independent journalists.
			</p>

			<a id="routing-diagram"></a>
			<img
				src={routing}
				alt="Diagram of donations distributed from readers to journalists"
				class="mt-8 rounded-lg shadow-sm"
			/>

			<p>Think of it like a monthly GoFundMe.</p>
		</div>

		{#if !page.data.sessionUser}
			<button
				type="button"
				onclick={() => (signInOpen = true)}
				class="mt-10 rounded-md bg-stone-900 px-6 py-3 text-base font-medium text-stone-50 hover:bg-stone-700"
			>
				Sign Up
			</button>
		{/if}
	</main>
</div>

{#if signInOpen}
	<SignInModal onClose={() => (signInOpen = false)} />
{/if}
