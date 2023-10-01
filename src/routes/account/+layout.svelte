<script lang="ts">
	import { page } from '$app/stores';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
</script>

<TabGroup>
	<TabAnchor selected={$page.url.pathname.endsWith('/account')} href="/account">Profile</TabAnchor>
	<TabAnchor selected={$page.url.pathname.endsWith('/connections')} href="/account/connections">Connections</TabAnchor>
	<TabAnchor selected={$page.url.pathname.endsWith('/settings')} href="/account/settings">Settings</TabAnchor>
</TabGroup>

<div class="p-4">
	<slot />
</div>
