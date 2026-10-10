<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';

	let { children, showReserved = true, onSignIn }: { children: any; showReserved?: boolean; onSignIn?: () => void } = $props();
</script>

<div class="min-h-screen">
	<div class="mx-auto flex w-full max-w-7xl items-stretch">
		<Sidebar {onSignIn} />

		<main class="min-w-0 flex-1 px-6 py-12">
			{@render children()}
		</main>

		{#if showReserved}
			<div class="hidden w-64 shrink-0 lg:block" aria-hidden="true"></div>
		{/if}
	</div>
</div>
