<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import SignInModal from '$lib/components/SignInModal.svelte';

	let signInOpen = $state(false);
</script>

<svelte:head><title>Contact Us | Feed The News</title></svelte:head>

<div class="min-h-screen">
	<Header onSignIn={() => (signInOpen = true)} />

	<main class="mx-auto w-full max-w-5xl px-6 py-12">
		<h1 class="font-serif text-3xl font-bold tracking-tight text-stone-900">Contact Us</h1>
		<p class="mt-1 text-sm text-stone-500">Get in touch with the Feed The News team</p>

		<p class="mt-8 max-w-2xl text-base leading-7 text-stone-600">
			We'd love to hear from you! Whether you have questions, feedback, or need support, don't
			hesitate to reach out to us.
		</p>

		<div class="mt-8 grid gap-6 lg:grid-cols-2">
			<section class="rounded-lg bg-white p-6 shadow-sm">
				<h2 class="font-serif text-xl font-bold tracking-tight text-stone-900">Get in Touch</h2>

				<div class="mt-6 flex items-start gap-4">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-stone-200 text-stone-700"
					>
						<svg
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							class="h-6 w-6"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 8l7.89 4.703a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<div>
						<h3 class="font-serif text-lg font-bold text-stone-900">Email</h3>
						<a
							href="mailto:contact@feedthenews.org"
							class="mt-1 inline-block font-medium text-stone-900 underline hover:text-stone-600"
						>
							contact@feedthenews.org
						</a>
						<p class="mt-1 text-sm text-stone-500">For support, feedback, or general inquiries</p>
					</div>
				</div>

				<div class="mt-6 flex items-start gap-4">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-stone-200 text-stone-700"
					>
						<svg fill="currentColor" viewBox="0 0 24 24" class="h-6 w-6" aria-hidden="true">
							<path
								d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
							/>
						</svg>
					</div>
					<div>
						<h3 class="font-serif text-lg font-bold text-stone-900">Social Media</h3>
						<a
							href="https://bsky.app/profile/lapsu.bsky.social"
							target="_blank"
							rel="noopener noreferrer"
							class="mt-1 inline-block font-medium text-stone-900 underline hover:text-stone-600"
						>
							@feedthenews.org
						</a>
						<p class="mt-1 text-sm text-stone-500">
							Follow us on Bluesky for updates and announcements
						</p>
					</div>
				</div>
			</section>

			<section class="rounded-lg bg-white p-6 shadow-sm">
				<h2 class="font-serif text-xl font-bold tracking-tight text-stone-900">
					Frequently Asked Questions
				</h2>

				<div class="mt-6">
					<h3 class="font-serif text-lg font-bold text-stone-900">How do I reset my password?</h3>
					<p class="mt-2 text-base leading-7 text-stone-600">
						Feed The News uses phone number authentication. Simply sign in with your phone number to
						access your account - no password required!
					</p>
				</div>

				<div class="mt-6">
					<h3 class="font-serif text-lg font-bold text-stone-900">
						How much does Feed The News cost?
					</h3>
					<p class="mt-2 text-base leading-7 text-stone-600">
						Feed The News charges a small fee for transactions and the rest goes to support whoever
						you choose.
					</p>
				</div>
			</section>
		</div>

		<section class="mt-6 rounded-lg bg-white p-6 shadow-sm">
			<h2 class="font-serif text-xl font-bold tracking-tight text-stone-900">Response Time</h2>
			<p class="mt-2 text-base leading-7 text-stone-600">
				We typically respond to inquiries within 24-48 hours
				during business days.
			</p>
		</section>

		<a
			href="/"
			class="mt-8 inline-block text-sm font-medium text-stone-600 underline hover:text-stone-900"
		>
			← Back to Home
		</a>
	</main>
</div>

{#if signInOpen}
	<SignInModal onClose={() => (signInOpen = false)} />
{/if}
