<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import SignInModal from '$lib/components/SignInModal.svelte';

	let signInOpen = $state(false);

	const today = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	const sections = [
		{
			title: 'Information we collect',
			body: [
				'When you create an account we collect your name, email address, and phone number. When you make a donation we collect the transaction amount and date; payment card details are handled entirely by our third-party payment processor and are never stored on our servers.'
			]
		},
		{
			title: 'How we use your information',
			body: [
				'We use your information to operate your account, process donations, send receipts, and communicate important updates about the service. We do not sell or rent your personal information to third parties.'
			]
		},
		{
			title: 'Cookies and analytics',
			body: [
				'We use essential cookies to keep you signed in and remember your preferences. We may use privacy-respecting analytics to understand how the site is used. We do not use third-party advertising trackers.'
			]
		},
		{
			title: 'Data sharing',
			body: [
				'We share data only when necessary: with our payment processor to handle donations, with infrastructure providers that host the site, or when required by law. All third parties are contractually required to protect your data.'
			]
		},
		{
			title: 'Data retention',
			body: [
				'We retain your account information for as long as your account is active. Donation records are kept as required for tax and accounting purposes. If you close your account, we delete your personal data within 30 days, except where retention is required by law.'
			]
		},
		{
			title: 'Your rights',
			body: [
				'You may access, correct, or delete your personal information at any time from your account settings or by contacting us. Where applicable law provides additional rights such as data portability or restriction of processing, we will honour those requests.'
			]
		},
		{
			title: 'Security',
			body: [
				'We protect your data with encryption in transit and at rest, and we limit access to personal information to staff who need it to operate the service.'
			]
		},
		{
			title: 'Changes to this policy',
			body: [
				'We may update this policy from time to time. We will notify you of material changes by email or a prominent notice on the site. Continued use after changes are published constitutes acceptance.'
			]
		},
		{
			title: 'Contact',
			body: [
				'If you have questions about this privacy policy or your personal data, please contact us through the support address listed on the site.'
			]
		}
	];
</script>

<svelte:head><title>Privacy Policy | Feed The News</title></svelte:head>

<div class="min-h-screen">
	<Header onSignIn={() => (signInOpen = true)} />

	<main class="mx-auto w-full max-w-5xl px-6 py-12">
		<h1 class="font-serif text-3xl font-bold tracking-tight text-stone-900">Privacy Policy</h1>
		<p class="mt-1 text-sm text-stone-500">Last updated: {today}</p>

		<div class="mt-8 divide-y divide-stone-200 rounded-lg bg-white shadow-sm">
			{#each sections as section, i}
				<div class="p-6">
					<h2 class="font-serif text-lg font-bold text-stone-900">
						{i + 1}. {section.title}
					</h2>
					{#each section.body as paragraph}
						<p class="mt-3 text-base leading-7 text-stone-600">{paragraph}</p>
					{/each}
				</div>
			{/each}
		</div>
	</main>
</div>

{#if signInOpen}
	<SignInModal onClose={() => (signInOpen = false)} />
{/if}
