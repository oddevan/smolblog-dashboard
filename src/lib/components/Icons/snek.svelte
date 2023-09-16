<script lang="ts">
	export let alt: string | undefined = undefined;
	export let size = 10;
	const nodeClass = $$props.class ?? `w-${size} h-${size}`;
</script>

<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 2000 1500" style="enable-background:new 0 0 2000 1500;" class={nodeClass} xml:space="preserve">
<style type="text/css">
	.st0{fill:#88D491;}
</style>
<g>
	<path class="st0" d="M1333.3,166.7c-311.3,0-572,213.7-645.4,502.1c81.9,10.6,145.4,79.8,145.4,164.5c0,92-74.6,166.7-166.7,166.7
		S500,925.4,500,833.3s74.6-166.7,166.7-166.7v-500C298.5,166.7,0,465.1,0,833.3S298.5,1500,666.7,1500
		c311.3,0,572-213.7,645.4-502.1c-81.9-10.6-145.4-79.8-145.4-164.5c0-92,74.6-166.7,166.7-166.7c92,0,166.7,74.6,166.7,166.7
		s-74.6,166.7-166.7,166.7v500c368.2,0,666.7-298.5,666.7-666.7S1701.5,166.7,1333.3,166.7z M416.7,500c-46,0-83.3-37.3-83.3-83.3
		c0-46,37.3-83.3,83.3-83.3s83.3,37.3,83.3,83.3C500,462.7,462.7,500,416.7,500z"/>
	<path class="st0" d="M750,83.3c0-46-37.3-83.3-83.3-83.3v166.7C712.7,166.7,750,129.4,750,83.3z"/>
</g>
</svg>
{#if alt}<span class="sr-only">{alt}</span>{/if}
