<script lang="ts">
	import { page } from '$app/state';

	const menu: { label: string; href: string }[] = [
		{ label: 'Home', href: '/' },
		{ label: 'Search', href: '/search' },
		{ label: 'Sponsorships', href: '/sponsorships' },
		{ label: 'Sponsors', href: '/sponsors' },
		{ label: 'History', href: '/history' }
	];

	const isActive = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

<aside class="flex h-full w-56 flex-col border-r border-stone-300 bg-white">
	<a href="/" class="border-b border-stone-300 px-6 py-5 font-serif text-xl font-bold tracking-tight text-stone-900">
		Feed The News
	</a>

	<nav class="flex flex-col gap-1 p-4">
		{#each menu as item (item.href)}
			<a
				href={item.href}
				aria-current={isActive(item.href) ? 'page' : undefined}
				class="rounded-md px-3 py-2 text-sm font-medium {isActive(item.href)
					? 'bg-stone-100 text-stone-900'
					: 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'}"
			>
				{item.label}
			</a>
		{/each}
	</nav>
</aside>
