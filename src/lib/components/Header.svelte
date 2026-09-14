<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		onSignIn: () => void;
	}

	let { onSignIn }: Props = $props();
</script>

<header class="w-full border-b border-stone-300">
	<div class="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
		<a href="/" class="font-serif text-xl font-bold tracking-tight text-stone-900">
			Feed The News
		</a>

		{#if page.data.user}
			<span class="text-sm font-medium text-stone-900">{page.data.user.name}</span>
		{:else}
			<button
				onclick={onSignIn}
				class="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-700"
			>
				Sign In
			</button>
		{/if}
	</div>
</header>
