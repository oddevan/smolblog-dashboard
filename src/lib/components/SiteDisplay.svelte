<script lang="ts">
	import type { Site } from "$lib/smolblog/types";
	import Icon from "./Icon.svelte";

	export let site: Site;
	export let maxWidth = '100%';

	const siteServer = (new URL(site.baseUrl)).hostname;
</script>

<style lang="scss">
	.site-menu-item {
		overflow: hidden;
		display: flex;
		flex-direction: row;

		.column-icon {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40px;
		}

		.name, .url {
			display: block;
			text-align: start;
		}
	}
</style>

<div class="site-menu-item" style:max-width={maxWidth}>
	<div class="column-icon">
		<span class="icon"><Icon icon="layout-text-window-reverse"/></span>
	</div>
	<div class="column-text">
		<span class="name">{site.displayName}</span>
		<small class="text-body-tertiary url">{siteServer}</small>
	</div>
</div>