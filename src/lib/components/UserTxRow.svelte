<script lang="ts">
	import type { UserTx } from '$lib/generated/query';

	let { tx }: { tx: UserTx } = $props();
</script>

<li class="flex items-center justify-between py-2 text-sm">
	<div class="flex flex-col">
		<span class="text-stone-700">{tx.desc}</span>
		<span class="text-xs text-stone-500">{tx.txStatus} · {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(String(tx.statusAt)))}</span>
	</div>
	<span class="font-medium text-stone-900">${(tx.amt / 100).toFixed(2)}</span>
</li>
