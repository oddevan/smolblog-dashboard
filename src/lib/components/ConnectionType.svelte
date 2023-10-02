<script lang="ts">
	import { Microblog, Site, Tumblr } from "./Icons";
	import type { IconSize } from "./Icons/BaseIcon.svelte";

	export let provider: string;
	export let iconSize: IconSize = 'medium';
	export let withName = false;

	const iconComponent = (() => {
		switch (provider) {
			case 'microblog':
				return Microblog;
			case 'tumblr':
				return Tumblr;
			default:
				return Site;
		}
	})();

	const providerName = (() => {
		switch (provider) {
			case 'microblog':
				return 'Micro.blog';
			default:
				return provider.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1));
		}
	})();
	const iconAlt = withName ? undefined : providerName;
</script>

<span class="flex items-center me-2">
	<svelte:component this={iconComponent} size={iconSize} alt={iconAlt} />
	{#if withName}
		<span class="ms-2">{providerName}</span>
	{/if}
</span>