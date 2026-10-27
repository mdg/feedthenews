<script lang="ts">
	import { page } from '$app/state';
	import Username from './Username.svelte';
	import { fetchMut } from '$lib/graph';

	let { maker }: { maker: any } = $props();

	async function cancel() {
		const csrf = page.data.csrf_token as string | null;
		if (!csrf) return;
		try {
			await fetchMut(csrf).CancelSponsorship({ maker: maker.name });
			maker.sessionUserSponsorship = null;
		} catch {}
	}

	async function sponsor() {
		const csrf = page.data.csrf_token as string | null;
		if (!csrf) return;
		try {
			const res = await fetchMut(csrf).Sponsor({ maker: maker.name });
			if (res.sessionUser?.sponsor?.status === 'ACTIVE') {
				maker.sessionUserSponsorship = { status: 'ACTIVE' };
			}
		} catch {}
	}
</script>

<li class="flex items-center gap-4 px-6 py-4">
	{#if maker.avatar}
		<img
			src={maker.avatar}
			alt={`${maker.name}'s avatar`}
			class="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-stone-200"
		/>
	{/if}

	<div class="min-w-0 flex-1">
		<a
			href={`/@${maker.name}`}
			class="text-sm font-semibold text-stone-900 hover:underline"
		>
			<Username name={maker.name} platformType={maker.platformType} />
		</a>
	</div>

	{#if maker.sessionUserSponsorship}
		<button
			type="button"
			onclick={cancel}
			class="shrink-0 rounded-md bg-stone-200 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-300"
		>
			Sponsored
		</button>
	{:else}
		<button
			type="button"
			onclick={sponsor}
			class="shrink-0 rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-700"
		>
			Sponsor
		</button>
	{/if}
</li>
