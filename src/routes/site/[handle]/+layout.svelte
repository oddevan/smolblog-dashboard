<script lang="ts">
	import { page } from '$app/stores';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let routeRoot: string;
	$: routeRoot = `/site/${data.site?.handle}`;
</script>

<TabGroup>
	<TabAnchor selected={$page.url.pathname.endsWith(data.site?.handle ?? '/')} href="{routeRoot}">Content</TabAnchor>
	<TabAnchor selected={$page.url.pathname.endsWith('/channels')} href="{routeRoot}/channels">Channels</TabAnchor>
	<TabAnchor selected={$page.url.pathname.endsWith('/settings')} href="{routeRoot}/settings">Settings</TabAnchor>
	<TabAnchor class="variant-filled-primary" selected={$page.url.pathname.endsWith('/new')} href="{routeRoot}/new">Add New</TabAnchor>
</TabGroup>

<div class="p-4">
	<slot />
</div>
