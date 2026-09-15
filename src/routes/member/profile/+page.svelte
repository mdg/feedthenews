<script lang="ts">
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import SignInModal from '$lib/components/SignInModal.svelte';
	import { fetchMut } from '$lib/graph';

	let { data } = $props();

	const userProfile = (() => data.profile.user)();
	const initialName = userProfile?.name ?? '';
	let signInOpen = $state(false);
	let newName = $state(initialName);
	let savedName = $state(initialName);
	let saving = $state(false);
	let status: { kind: 'error' | 'success'; message: string } | null = $state(null);

	async function saveName() {
		const name = newName.trim();
		if (!name || saving) return;

		const csrf = page.data.csrf_token as string | null;
		if (!csrf) {
			status = { kind: 'error', message: 'Session expired. Please sign in again.' };
			return;
		}

		saving = true;
		status = null;

		try {
			const res = await fetchMut(csrf).SetUserName({ newName: name });
			savedName = res.user?.setName ?? name;
			status = { kind: 'success', message: 'Name updated.' };
		} catch {
			status = { kind: 'error', message: 'Could not update your name. Please try again.' };
		} finally {
			saving = false;
		}
	}

	function onFormSubmit(event: SubmitEvent) {
		event.preventDefault();
		saveName();
	}
</script>

<svelte:head><title>Profile | Feed The News</title></svelte:head>

<div class="min-h-screen">
	<Header onSignIn={() => (signInOpen = true)} />

	<main class="mx-auto w-full max-w-5xl px-6 py-12">
		<h1 class="font-serif text-3xl font-bold tracking-tight text-stone-900">Profile</h1>

		{#if userProfile}
			<dl
				class="mt-8 grid max-w-md grid-cols-1 gap-x-8 gap-y-4 rounded-lg bg-white p-6 shadow-sm sm:grid-cols-2"
			>
				<div>
					<dt class="text-sm font-medium text-stone-500">Name</dt>
					<dd class="mt-1 text-sm font-semibold text-stone-900">{savedName}</dd>
				</div>
				<div>
					<dt class="text-sm font-medium text-stone-500">Email</dt>
					<dd class="mt-1 text-sm font-semibold text-stone-900">{userProfile.email ?? '—'}</dd>
				</div>
				<div>
					<dt class="text-sm font-medium text-stone-500">Phone</dt>
					<dd class="mt-1 text-sm font-semibold text-stone-900">{userProfile.phone ?? '—'}</dd>
				</div>
				<div>
					<dt class="text-sm font-medium text-stone-500">Privacy</dt>
					<dd class="mt-1 text-sm font-semibold text-stone-900">{userProfile.privacy ?? '—'}</dd>
				</div>
				<div>
					<dt class="text-sm font-medium text-stone-500">Status</dt>
					<dd class="mt-1 text-sm font-semibold text-stone-900">{userProfile.status ?? '—'}</dd>
				</div>
				<div>
					<dt class="text-sm font-medium text-stone-500">User type</dt>
					<dd class="mt-1 text-sm font-semibold text-stone-900">{userProfile.userType ?? '—'}</dd>
				</div>
				<div>
					<dt class="text-sm font-medium text-stone-500">Staff</dt>
					<dd class="mt-1 text-sm font-semibold text-stone-900">
						{userProfile.isStaff ? 'Yes' : 'No'}
					</dd>
				</div>
			</dl>
		{:else}
			<p class="mt-8 text-sm text-stone-600">No profile available.</p>
		{/if}

		<div class="mt-12 max-w-md">
			<h2 class="font-serif text-xl font-bold tracking-tight text-stone-900">Change your name</h2>

			<form onsubmit={onFormSubmit} class="mt-4 flex gap-2">
				<input
					type="text"
					bind:value={newName}
					placeholder="Your name"
					class="w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500"
				/>
				<button
					type="submit"
					disabled={saving || !newName.trim()}
					class="shrink-0 rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{saving ? 'Saving…' : 'Save'}
				</button>
			</form>

			{#if status}
				<p
					class="mt-3 text-sm"
					class:text-red-600={status.kind === 'error'}
					class:text-green-600={status.kind === 'success'}
				>
					{status.message}
				</p>
			{/if}
		</div>
	</main>
</div>

{#if signInOpen}
	<SignInModal onClose={() => (signInOpen = false)} />
{/if}
