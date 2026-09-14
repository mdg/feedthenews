<script lang="ts">
	import { newsApi } from '$lib/news';

	interface Props {
		onClose: () => void;
	}

	let { onClose }: Props = $props();

	let phone = $state('');
	let submitting = $state(false);
	let status: { kind: 'error' | 'success'; message: string } | null = $state(null);

	async function submit() {
		if (!phone.trim() || submitting) return;

		submitting = true;
		status = null;

		try {
			const res = await newsApi().requestSignIn(phone.trim());

			if (res.body.success) {
				status = { kind: 'success', message: res.body.message };
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
		submit();
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
			Enter your phone number to receive a verification code.
		</p>

		<form onsubmit={onFormSubmit}>
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
				onclick={submit}
				disabled={submitting || !phone.trim()}
				class="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{submitting ? 'Sending…' : 'Sign In'}
			</button>
		</div>
	</div>
</div>
