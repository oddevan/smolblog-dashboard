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
	const nodeClass = `w-${size} h-${size} block ${$$props.class}`;
</script>

<style lang="postcss">
	span :global(svg) {
		@apply w-full h-full;
	}
</style>

<span class={nodeClass} aria-hidden="true">
	<slot />
</span>
{#if alt}<span class="sr-only">{alt}</span>{/if}