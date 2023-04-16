<script>
	import Icon from "$lib/components/Icon.svelte";
	import context, { demoContext } from "$lib/stores/context";
	import SidebarFrame from "./SidebarFrame.svelte";
</script>

<SidebarFrame>
	{#if !$context?.site}
	<p>Welcome! Select a site to get started.</p>
	<button type="button" class="btn btn-primary p-2" data-bs-toggle="modal" data-bs-target="#siteSelectModal">
		<Icon icon="window-stack"/>
		Select Site
	</button>
	{/if}

	<button class="btn btn-secondary-outline" on:click={() => {
		context.initWithContext(demoContext);
	}}>
		Restore Demo Context
	</button>
</SidebarFrame>
