<script lang="ts">
	let { children, title, loading = false }: { children: any; title: string; loading?: boolean } =
		$props();
</script>

<div class="mx-auto w-full max-w-2xl">
	<h1 class="font-serif text-3xl font-bold tracking-tight text-stone-900">{title}</h1>

	{#if loading}
		<div class="flex h-64 items-center justify-center" role="status" aria-live="polite">
			<svg
				class="h-6 w-6 animate-spin text-stone-400"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<circle
					class="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
				/>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
			</svg>
			<span class="ml-3 text-sm text-stone-500">Loading…</span>
		</div>
	{:else}
		{@render children()}
	{/if}
</div>
