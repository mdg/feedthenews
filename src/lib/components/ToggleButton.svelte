<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		active?: boolean;
		disabled?: boolean;
		onclick?: (event: MouseEvent) => void;
		children: Snippet;
	}

	let { active = false, disabled = false, onclick, children }: Props = $props();
</script>

<button
	type="button"
	{onclick}
	{disabled}
	aria-pressed={active}
	class="rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
	class:bg-emerald-100={!active}
	class:text-emerald-900={!active}
	class:hover:bg-emerald-200={!active}
	class:bg-white={active}
	class:text-stone-900={active}
	class:shadow-sm={active}
	class:ring-1={active}
	class:ring-stone-300={active}
>
	{@render children()}
</button>
