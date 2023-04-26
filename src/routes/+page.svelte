<script lang="ts">
	import Icon from "$lib/components/Icon.svelte";
	import { getContext } from "svelte";
	import SidebarFrame from "./SidebarFrame.svelte";
	import type { SmolblogStore } from "$lib/stores/context";
	import LoginModal from "./LoginModal.svelte";

	const context = getContext<SmolblogStore>('smolblog');
</script>

<SidebarFrame>
	{#if !$context?.site}
	<p>Welcome! Select a site to get started.</p>
	<button type="button" class="btn btn-primary p-2" data-bs-toggle="modal" data-bs-target="#siteSelectModal">
		<Icon icon="window-stack"/>
		Select Site
	</button>
	{/if}
</SidebarFrame>
