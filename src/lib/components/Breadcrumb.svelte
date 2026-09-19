<script lang="ts">
	let { href = '/', label = 'Home' }: { href?: string; label?: string } = $props();
</script>

<div class="mb-6">
	<a href={href} class="text-sm font-medium text-stone-600 hover:text-stone-900 underline">
		&lt; {label}
	</a>
</div>
