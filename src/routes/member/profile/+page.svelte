<script lang="ts">
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import SignInModal from '$lib/components/SignInModal.svelte';
	import { fetchMut } from '$lib/graph';
	import { newsApi } from '$lib/news';

	let { data } = $props();

	const userProfile = (() => data.profile.user)();
	const initialName = userProfile?.name ?? '';
	let signInOpen = $state(false);
	let editingName = $state(false);
	let newName = $state(initialName);
	let savedName = $state(initialName);
	let saving = $state(false);
	let signingOut = $state(false);
	let status: { kind: 'error' | 'success'; message: string } | null = $state(null);

	async function signOut() {
		if (signingOut) return;
		signingOut = true;

		try {
			await newsApi(page.data.csrf_token).signOut();
		} catch {
			// fall through and still navigate away
		} finally {
			window.location.reload();
		}
	}

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
			editingName = false;
			status = { kind: 'success', message: 'Name updated.' };
			window.location.reload();
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

	function startEditName() {
		newName = savedName;
		status = null;
		editingName = true;
	}

	function cancelEditName() {
		editingName = false;
		status = null;
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
				<div class="sm:col-span-2">
					<dt class="text-sm font-medium text-stone-500">Name</dt>
					{#if editingName}
						<form onsubmit={onFormSubmit} class="mt-1 flex items-center gap-2">
							<input
								type="text"
								bind:value={newName}
								placeholder="Your name"
								class="w-full rounded-md border-stone-300 text-sm shadow-sm focus:border-stone-500 focus:ring-stone-500"
							/>
							<button
								type="submit"
								disabled={saving || !newName.trim()}
								class="shrink-0 rounded-md bg-stone-900 px-3 py-1.5 text-sm font-medium text-stone-50 hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{saving ? '…' : '✓'}
							</button>
							<button
								type="button"
								onclick={cancelEditName}
								class="shrink-0 rounded-md border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-700 hover:bg-stone-100"
							>
								✕
							</button>
						</form>
					{:else}
						<dd class="mt-1 flex items-center gap-2 text-sm font-semibold text-stone-900">
							{savedName}
							<button
								type="button"
								onclick={startEditName}
								class="text-stone-400 hover:text-stone-600"
								aria-label="Edit name"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="h-4 w-4"
								>
									<path
										d="M2.695 14.763l-1.262 3.154a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.885L17.5 5.5a2.121 2.121 0 0 0-3-3L3.58 13.42a4 4 0 0 0-.885 1.343Z"
									/>
								</svg>
							</button>
						</dd>
					{/if}
					{#if status}
						<p
							class="mt-1 text-xs"
							class:text-red-600={status.kind === 'error'}
							class:text-green-600={status.kind === 'success'}
						>
							{status.message}
						</p>
					{/if}
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
				{#if userProfile.isStaff}
					<div>
						<dt class="text-sm font-medium text-stone-500">Staff</dt>
						<dd class="mt-1 text-sm font-semibold text-stone-900">Yes</dd>
					</div>
				{/if}
			</dl>
		{:else}
			<p class="mt-8 text-sm text-stone-600">No profile available.</p>
		{/if}

		<div class="mt-12 border-t border-stone-300 pt-6">
			<button
				type="button"
				onclick={signOut}
				disabled={signingOut}
				class="rounded-md border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{signingOut ? 'Signing out…' : 'Sign Out'}
			</button>
		</div>
	</main>
</div>

{#if signInOpen}
	<SignInModal onClose={() => (signInOpen = false)} />
{/if}
