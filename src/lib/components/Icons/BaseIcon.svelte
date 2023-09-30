<script lang="ts" context="module">
	export interface IconProps {
		alt?: string,
		size?: number,
		class?: string,
	};
</script>

<script lang="ts">
	export let alt: string | undefined = undefined;
	export let size = 6;
	const nodeClass = $$props.class ?? `w-${size} h-${size}`;
</script>

<span class={nodeClass} aria-hidden="true">
	<slot />
</span>
{#if alt}<span class="sr-only">{alt}</span>{/if}