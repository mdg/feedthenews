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
			title: 'About',
			body: [
				'Feed The News ("we", "us") operates a donation-based website that lets visitors support our work with voluntary contributions. By using this site or making a donation, you agree to these terms.'
			]
		},
		{
			title: 'Donations',
			body: [
				'All donations are voluntary contributions and are not payments for goods or services. Donations are processed by third-party payment providers, and we do not store your payment card details.'
			]
		},
		{
			title: 'Subscriptions and cancellation',
			body: [
				'Recurring donations renew monthly until cancelled. You may cancel your subscription at any time from your account dashboard or by contacting us. Cancellation stops future charges but does not entitle you to a refund of amounts already processed.'
			]
		},
		{
			title: 'Refunds',
			body: [
				'Because donations are voluntary, refunds are generally not offered. If you believe a donation was made in error, contact us within 14 days and we will consider a refund in good faith.'
			]
		},
		{
			title: 'Accounts',
			body: [
				'You are responsible for the accuracy of the information you provide and for keeping your sign-in credentials secure. We may suspend or close accounts that violate these terms.'
			]
		},
		{
			title: 'Acceptable use',
			body: [
				'You agree not to misuse the site, including attempting unauthorised access, interfering with its operation, or using it for unlawful purposes.'
			]
		},
		{
			title: 'No warranty and limitation of liability',
			body: [
				'The site is provided "as is" without warranties of any kind. To the maximum extent permitted by law, our liability to you is limited to the amount you donated in the 12 months before the claim.'
			]
		},
		{
			title: 'Changes',
			body: [
				'We may update these terms from time to time. Continued use of the site after changes are published constitutes acceptance of the updated terms.'
			]
		},
		{
			title: 'Contact',
			body: ['Questions about these terms can be sent to our support address listed on the site.']
		}
	];
</script>

<svelte:head><title>Terms &amp; Conditions | Feed The News</title></svelte:head>

<div class="min-h-screen">
	<Header onSignIn={() => (signInOpen = true)} />

	<main class="mx-auto w-full max-w-5xl px-6 py-12">
		<h1 class="font-serif text-3xl font-bold tracking-tight text-stone-900">
			Terms &amp; Conditions
		</h1>
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
