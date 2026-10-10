<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		onSignIn?: () => void;
	}

	let { onSignIn }: Props = $props();

	const menu: { label: string; href: string }[] = [
		{ label: 'Home', href: '/' },
		// { label: 'Search', href: '/search' },
		// { label: 'Sponsorships', href: '/sponsorships' },
		// { label: 'Sponsors', href: '/sponsors' },
		// { label: 'History', href: '/history' }
	];

	const isActive = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

<aside class="flex h-full w-64 shrink-0 flex-col justify-between bg-white">
	<div>
		<a
			href="/"
			class="block px-6 py-8 font-serif text-2xl font-bold tracking-tight text-stone-900"
		>
			Feed The News
		</a>

		<nav class="flex flex-col gap-1.5 px-4 pt-8" aria-label="Main">
			{#each menu as item (item.href)}
				<a
					href={item.href}
					aria-current={isActive(item.href) ? 'page' : undefined}
					class="relative flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors {isActive(item.href)
						? 'bg-stone-100 text-stone-900'
						: 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'}"
				>
					{#if isActive(item.href)}
						<span
							class="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-amber-500"
							aria-hidden="true"
						></span>
					{/if}
					{item.label}
				</a>
			{/each}
		</nav>
	</div>

	<div class="border-t border-stone-200 p-4">
		{#if page.data.sessionUser}
			<a
				href="/member/profile"
				class="block rounded-lg px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100 hover:text-stone-900"
			>
				{page.data.sessionUser.name}
			</a>
		{:else if onSignIn}
			<button
				type="button"
				onclick={onSignIn}
				class="w-full rounded-md bg-stone-900 px-4 py-2.5 text-sm font-medium text-stone-50 hover:bg-stone-700"
			>
				Sign In
			</button>
		{/if}
	</div>
</aside>
