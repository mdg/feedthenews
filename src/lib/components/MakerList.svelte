<script lang="ts">
	import MakerRow from './MakerRow.svelte';
	let { makers }: { makers: any[] } = $props();
</script>

<ul class="divide-y divide-stone-200 rounded-xl bg-white shadow-sm">
	{#each makers as maker (maker.name)}
		<MakerRow {maker} />
	{/each}
</ul>
