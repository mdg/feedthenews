<script lang="ts">
	import MainLayout from '$lib/components/MainLayout.svelte';
	import Label from '$lib/components/Label.svelte';
	import Username from '$lib/components/Username.svelte';

	let { data } = $props();

	const dateFmt = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });
	function formatDate(value: unknown) {
		return value ? dateFmt.format(new Date(String(value))) : '—';
	}
</script>

<svelte:head><title>Sponsorships | Feed The News</title></svelte:head>

<MainLayout>
	<div class="mx-auto w-full max-w-2xl">
		<h1 class="font-serif text-3xl font-bold tracking-tight text-stone-900">Sponsorships</h1>

		{#if data.sponsorships.length > 0}
			<ul class="mt-8 divide-y divide-stone-200 rounded-xl bg-white shadow-sm">
				{#each data.sponsorships as sponsorship, i (i)}
					<li class="flex items-center gap-4 px-6 py-4">
						{#if sponsorship.maker?.avatar}
							<img
								src={sponsorship.maker.avatar}
								alt={`${sponsorship.maker.name}'s avatar`}
								class="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-stone-200"
							/>
						{/if}

						<div class="min-w-0 flex-1">
							<a
								href={`/@${sponsorship.maker?.name ?? ''}`}
								class="text-sm font-semibold text-stone-900 hover:underline"
							>
								<Username
									name={sponsorship.maker?.name ?? 'Unknown'}
									platformType={sponsorship.maker?.platformType ?? ''}
								/>
							</a>
							<p class="mt-0.5 text-xs text-stone-500">
								Since {formatDate(sponsorship.insertedAt)}
							</p>
						</div>

						<div class="flex shrink-0 items-center gap-1.5">
							{#if sponsorship.anonymous}
								<Label label="Anonymous" tone="amber" />
							{/if}
							{#if sponsorship.matching}
								<Label label="Matching" tone="stone" />
							{/if}
							<Label
								label={String(sponsorship.status).toLowerCase()}
								tone={sponsorship.status === 'ACTIVE' ? 'green' : 'stone'}
							/>
						</div>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="mt-8 text-sm text-stone-500">No active sponsorships</p>
		{/if}
	</div>
</MainLayout>
