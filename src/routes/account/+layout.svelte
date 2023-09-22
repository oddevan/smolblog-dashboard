<script lang="ts">
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
</script>

<TabGroup>
	<TabAnchor href="/account">Profile</TabAnchor>
	<TabAnchor href="/account/connections">Connections</TabAnchor>
	<TabAnchor href="/account/settings">Settings</TabAnchor>
</TabGroup>

<slot />
