<script>
	import Icon from "$lib/components/Icon.svelte";
	import context from "$lib/stores/context";
	import SidebarFrame from "./SidebarFrame.svelte";
</script>

<SidebarFrame>
	{#if !$context.site}
	<p>Welcome! Select a site to get started.</p>
	<button type="button" class="btn btn-primary p-2" data-bs-toggle="modal" data-bs-target="#siteSelectModal">
		<Icon icon="window-stack"/>
		Select Site
	</button>
	{/if}
</SidebarFrame>
