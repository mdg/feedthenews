<script lang="ts">
	import { page } from '$app/state';
	import { newsApi } from '$lib/news';

	interface Props {
		onClose: () => void;
	}

	let { onClose }: Props = $props();

	let phone = $state('');
	let code = $state('');
	let step: 'phone' | 'code' = $state('phone');
	let submitting = $state(false);
	let status: { kind: 'error' | 'success'; message: string } | null = $state(null);

	async function submitPhone() {
		if (!phone.trim() || submitting) return;

		submitting = true;
		status = null;

		try {
			const res = await newsApi(page.data.csrf_token).requestSignIn(phone.trim());

			if (res.body.success) {
				step = 'code';
			} else {
				status = { kind: 'error', message: res.body.error };
			}
		} catch {
			status = { kind: 'error', message: 'Could not reach the server. Please try again.' };
		} finally {
			submitting = false;
		}
	}

	async function verifyCode() {
		if (!code.trim() || submitting) return;

		submitting = true;
		status = null;

		try {
			const res = await newsApi(page.data.csrf_token).verifySignIn(phone, code.trim());

			if (res.body.success) {
				window.location.reload();
			} else {
				status = { kind: 'error', message: res.body.error };
			}
		} catch {
			status = { kind: 'error', message: 'Could not reach the server. Please try again.' };
		} finally {
			submitting = false;
		}
	}

	function onFormSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (step === 'phone') submitPhone();
		else verifyCode();
	}
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4"
	role="presentation"
	onclick={onClose}
	onkeydown={(e) => {
		if (e.key === 'Escape') onClose();
	}}
>
	<div
		class="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl"
		role="dialog"
		aria-modal="true"
		aria-label="Sign In"
		tabindex="-1"
		onclick={(e) => e.stopPropagation()}
		onkeydown={(e) => e.stopPropagation()}
	>
		<h2 class="font-serif text-2xl font-bold text-stone-900">Sign In</h2>
		<p class="mt-1 text-sm text-stone-500">
			{#if step === 'phone'}
				Enter your phone number to receive a verification code.
			{:else}
				Enter the verification code sent to {phone}.
			{/if}
		</p>

		<form onsubmit={onFormSubmit}>
			{#if step === 'phone'}
				<label for="phone" class="mt-4 block text-sm font-medium text-stone-700">
					Phone number
				</label>
				<input
					id="phone"
					type="tel"
					bind:value={phone}
					placeholder="+1 555 555 5555"
					autocomplete="tel"
					class="mt-1 w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500"
				/>
			{:else}
				<label for="code" class="mt-4 block text-sm font-medium text-stone-700">
					Verification code
				</label>
				<input
					id="code"
					type="text"
					bind:value={code}
					placeholder="6-digit code"
					autocomplete="one-time-code"
					inputmode="numeric"
					class="mt-1 w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500"
				/>
			{/if}
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

		<div class="mt-5 flex justify-end gap-2">
			<button
				onclick={onClose}
				class="rounded-md border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100"
			>
				Cancel
			</button>
			<button
				onclick={step === 'phone' ? submitPhone : verifyCode}
				disabled={submitting || (step === 'phone' ? !phone.trim() : !code.trim())}
				class="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{submitting ? 'Sending…' : step === 'phone' ? 'Sign In' : 'Verify Code'}
			</button>
		</div>
	</div>
</div>
