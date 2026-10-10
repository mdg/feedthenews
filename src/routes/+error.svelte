<script lang="ts">
	import { page } from '$app/state';
	import MainLayout from '$lib/components/MainLayout.svelte';

	const status = $derived(page.status);
	const message = $derived(
		status === 404
			? "We looked everywhere, but that page doesn't exist. It may have been moved, or the address may be mistyped."
			: 'Something went wrong on our end. Please try again in a moment.'
	);
	const isNotFound = $derived(status === 404);
</script>

<svelte:head><title>{status} | Feed The News</title></svelte:head>

<MainLayout>
	<div class="mx-auto w-full max-w-2xl">
		<section class="rounded-xl bg-white p-10 text-center shadow-sm">
			<p class="font-serif text-6xl font-bold tracking-tight text-stone-300">{status}</p>
			<h1 class="mt-4 font-serif text-2xl font-bold tracking-tight text-stone-900">
				{isNotFound ? 'Page not found' : 'Something went wrong'}
			</h1>
			<p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-600">{message}</p>

			<div class="mt-8 flex items-center justify-center gap-3">
				<a
					href="/"
					class="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-700"
				>
					Go Home
				</a>
				{#if isNotFound && !page.url.pathname.startsWith('/@') && page.url.pathname.split('/').filter(Boolean).length === 1}
					<a
						href={`/@${page.url.pathname.replace(/^\//, '')}`}
						class="text-sm font-medium text-stone-700 underline-offset-4 hover:underline"
					>
						View as profile
					</a>
				{/if}
			</div>
		</section>
	</div>
</MainLayout>
