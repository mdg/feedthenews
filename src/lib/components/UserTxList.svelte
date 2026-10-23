<script lang="ts">
	import type { UserTx } from '$lib/generated/query';
	import UserTxRow from './UserTxRow.svelte';

	let { transactions }: { transactions: UserTx[] } = $props();
</script>

<ul class="divide-y divide-stone-200">
	{#each transactions as tx (tx.insertedAt + tx.desc)}
		<UserTxRow {tx} />
	{/each}
</ul>
