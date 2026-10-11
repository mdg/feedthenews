<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import MainLayout from '$lib/components/MainLayout.svelte';
	import MemberContent from '$lib/components/MemberContent.svelte';
	import Label from '$lib/components/Label.svelte';
	import SignInModal from '$lib/components/SignInModal.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { fetchQuery, fetchMut } from '$lib/graph';
	import { newsApi } from '$lib/news';
	import type { GetProfileQueryResult } from '$lib/generated/query';

	const sessionUser = $derived(page.data.sessionUser);

	let profile = $state<GetProfileQueryResult['sessionUser']>(undefined);
	let loading = $state(true);
	let error = $state(false);
	let signInOpen = $state(false);
	let editingName = $state(false);
	let newName = $state('');
	let savedName = $state('');
	let saving = $state(false);
	let signingOut = $state(false);
	let status: { kind: 'error' | 'success'; message: string } | null = $state(null);

	$effect(() => {
		if (!sessionUser) {
			goto('/welcome');
			return;
		}

		loading = true;
		error = false;

		fetchQuery()
			.GetProfile()
			.then((res) => {
				profile = res.sessionUser;
				savedName = res.sessionUser?.name ?? '';
				newName = savedName;
			})
			.catch(() => {
				error = true;
			})
			.finally(() => {
				loading = false;
			});
	});

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
			savedName = res.sessionUser.setName;
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

<MainLayout>
	<MemberContent title="Profile" {loading}>
		{#if error}
			<p class="mt-8 text-sm text-red-600">Could not load your profile. Please try again.</p>
		{:else if profile}
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
					<dd class="mt-1 text-sm font-semibold text-stone-900">{profile.email ?? '—'}</dd>
				</div>
				<div>
					<dt class="text-sm font-medium text-stone-500">Phone</dt>
					<dd class="mt-1 text-sm font-semibold text-stone-900">{profile.phone ?? '—'}</dd>
				</div>
			<div class="sm:col-span-2">
				<dt class="text-sm font-medium text-stone-500">Status</dt>
				<dd class="mt-1 flex flex-wrap items-center gap-1.5">
					<Label
						label={String(profile.privacy).toLowerCase()}
						tone={profile.privacy === 'PUBLIC' ? 'green' : 'amber'}
					/>
					<Label
						label={String(profile.status).toLowerCase()}
						tone={profile.status === 'ACTIVE'
							? 'green'
							: ['BANNED', 'DELETED', 'CLOSED'].includes(profile.status)
								? 'red'
								: 'amber'}
					/>
					{#if profile.isStaff}
						<Label label="Staff" tone="amber" />
					{/if}
					{#if profile.userType !== 'USER'}
						<Label label={String(profile.userType).toLowerCase()} tone="stone" />
					{/if}
				</dd>
			</div>
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
	</MemberContent>
</MainLayout>

{#if signInOpen}
	<SignInModal onClose={() => (signInOpen = false)} />
{/if}
