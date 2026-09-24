<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import favicon32 from '$lib/assets/favicon-32x32.png';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png" sizes="16x16" type="image/png" />
	<link rel="icon" href={favicon32} sizes="32x32" type="image/png" />
</svelte:head>
<div class="flex min-h-screen flex-col bg-stone-200 text-stone-900">
	<div class="flex-1">
		{@render children()}
	</div>
	<Footer />
</div>

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}>{locale}</a>
	{/each}
</div>
