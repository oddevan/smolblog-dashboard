<script lang="ts" context="module">
	export interface IconProps {
		alt?: string,
		size?: 'small'|'medium'|'large'|'xlarge',
		class?: string,
	};
</script>

<script lang="ts">
	export let alt: string | undefined = undefined;
	export let size: 'small'|'medium'|'large'|'xlarge' = 'medium';

	const sizeClasses = ((sizeDef) => {
		switch (sizeDef) {
			case 'small':
				return 'w-4 h-4';
			case 'medium':
				return 'w-6 h-6';
			case 'large':
				return 'w-8 h-8';
			case 'xlarge':
				return 'w-10 h-10';
		}
	})(size);
	const nodeClass = `${sizeClasses} block ${$$props.class ?? ''}`;
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