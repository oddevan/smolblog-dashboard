<script lang="ts">
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from "flowbite-svelte";

	export let sidebarClass = 'w-full';
</script>

<Sidebar asideClass={sidebarClass}>
	<SidebarWrapper>
		<SidebarGroup>
			<SidebarItem label="My Account" href="/account" />
			<SidebarItem label="My Connections" href="/account/connections" />
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>