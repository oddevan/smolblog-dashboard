<script lang="ts">
	import Icon from "$lib/components/Icon.svelte";
	import SidebarFrame from "./SidebarFrame.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	const { context, serverVersion } = data;
</script>

<SidebarFrame {serverVersion}>
	{#if !context?.currentSiteId}
	<p>Welcome! Select a site to get started.</p>
	<button type="button" class="btn btn-primary p-2" data-bs-toggle="modal" data-bs-target="#siteSelectModal">
		<Icon icon="window-stack"/>
		Select Site
	</button>
	{/if}

	<h4>Context</h4>
	<dl class="row">
		<dt class="col-sm-3">apiBase:</dt>
		<dd class="col-sm-9">{context?.apiBase}</dd>
		<dt class="col-sm-3">authHeader:</dt>
		<dd class="col-sm-9">{context?.authHeader}</dd>
	</dl>
</SidebarFrame>
