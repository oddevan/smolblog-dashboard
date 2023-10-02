<script lang="ts" context="module">
	export type IconSize = 'small'|'medium'|'large'|'xlarge';
	export interface IconProps {
		alt?: string,
		size?: IconSize,
		class?: string,
	};
</script>

<script lang="ts">
	export let alt: string | undefined = undefined;
	export let size: IconSize = 'medium';

	const sizeClasses = (() => {
		switch (size) {
			case 'small':
				return 'w-4 h-4';
			case 'medium':
				return 'w-6 h-6';
			case 'large':
				return 'w-8 h-8';
			case 'xlarge':
				return 'w-10 h-10';
		}
	})();
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