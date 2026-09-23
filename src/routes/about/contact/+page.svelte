<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PageContent from '$lib/components/PageContent.svelte';
</script>

<svelte:head>
</svelte:head>

<Header />

<PageContent>
	<div class="privacy-page">
		<div class="page-header">
			<h1 class="page-title">Contact Us</h1>
			<p class="page-subtitle">Get in touch with the Feed The News team</p>
		</div>

		<div class="card">
			<div class="privacy-content">
				<p class="contact-intro">
					We'd love to hear from you! Whether you have questions, feedback, or need support,
					don't hesitate to reach out to us.
				</p>

				<div class="contact-grid">
					<div class="contact-section">
						<h2>Get in Touch</h2>

						<div class="contact-item">
							<div class="contact-icon email">
								<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 8l7.89 4.703a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<div class="contact-details">
								<h3>Email</h3>
								<a href="mailto:contact@feedthenews.org">contact@feedthenews.org</a>
								<p>For support, feedback, or general inquiries</p>
							</div>
						</div>

						<div class="contact-item">
							<div class="contact-icon social">
								<svg fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
								</svg>
							</div>
							<div class="contact-details">
								<h3>Social Media</h3>
								<a
									href="https://bsky.app/profile/lapsu.bsky.social"
									target="_blank"
									rel="noopener noreferrer"
								>
									@feedthenews.org
								</a>
								<p>Follow us on Bluesky for updates and announcements</p>
							</div>
						</div>
					</div>

					<div class="contact-section">
						<h2>Frequently Asked Questions</h2>

						<div class="faq-item">
							<h4>How do I reset my password?</h4>
							<p>
								Feed The News uses phone number authentication. Simply sign in with your phone number
								to access your account - no password required!
							</p>
						</div>

						<div class="faq-item">
							<h4>How much does Feed The News cost?</h4>
							<p>
								Feed The News charges a small fee for transactions and the rest goes to support whoever you choose.
							</p>
						</div>
					</div>
				</div>

				<div class="response-time">
					<h3>Response Time</h3>
					<p>
						We typically respond to inquiries within 24-48 hours during business days.
						For urgent issues, please mention "URGENT" in your subject line.
					</p>
				</div>
			</div>
		</div>

		<div class="back-link">
			<a href="/" class="link">← Back to Home</a>
		</div>
	</div>
</PageContent>

<Footer />

<style>
/* Contact Page Styles */
.contact-intro {
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 2rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.contact-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1.5rem 0;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.contact-icon {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-icon.email {
  background-color: #dbeafe;
  color: #2563eb;
}

.contact-icon.social {
  background-color: #e0f2fe;
  color: #0284c7;
}

.contact-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.contact-details h3 {
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
  margin: 0 0 0.25rem 0;
}

.contact-details a {
  color: #2563eb;
  text-decoration: none;
  transition: color 0.2s;
}

.contact-details a:hover {
  color: #1d4ed8;
}

.contact-details p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.25rem 0 0 0;
}

.faq-item {
  margin-bottom: 1rem;
}

.faq-item h4 {
  font-weight: 500;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.faq-item p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.response-time {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.response-time h3 {
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
  margin: 0 0 1rem 0;
}

.response-time p {
  color: #6b7280;
  margin: 0;
}

/* Contact Page Responsive */
@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .contact-item {
    gap: 0.75rem;
  }

  .contact-icon {
    width: 2.5rem;
    height: 2.5rem;
  }

  .contact-icon svg {
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>
