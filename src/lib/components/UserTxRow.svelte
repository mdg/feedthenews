<script lang="ts">
	import type { UserTx } from '$lib/generated/query';

	let { tx }: { tx: UserTx } = $props();
</script>

<li class="flex items-center justify-between py-2 text-sm">
	<span class="text-stone-700">{tx.desc}</span>
	<span class="font-medium text-stone-900">${(tx.amt / 100).toFixed(2)}</span>
</li>
