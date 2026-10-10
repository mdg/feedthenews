<script lang="ts">
	type Tone = 'green' | 'amber' | 'red' | 'stone';

	interface Props {
		label: string;
		tone?: Tone;
	}

	let { label, tone = 'stone' }: Props = $props();

	const tones: Record<Tone, string> = {
		green: 'bg-green-100 text-green-800',
		amber: 'bg-amber-100 text-amber-800',
		red: 'bg-red-100 text-red-800',
		stone: 'bg-stone-100 text-stone-600'
	};
</script>

<span
	class="inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium {tones[tone]}"
>
	{label}
</span>
