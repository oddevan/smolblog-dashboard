<script lang="ts">
	import Icon from "$lib/components/Icon.svelte";
	import SidebarFrame from "../SidebarFrame.svelte";
</script>

<SidebarFrame>
<svelte:fragment slot="account-nav">
	<li class="nav-item bg-primary-subtle">
		<span class="nav-link"><Icon icon="person"/> My Account</span>
	</li>
	<li class="nav-item"><a class="nav-link" href="/account">Profile</a></li>
	<li class="nav-item"><a class="nav-link" href="/account/security">Security</a></li>
	<li class="nav-item"><a class="nav-link" href="/account/connections">Connections</a></li>
	<li class="nav-item"><a class="nav-link" href="/account/preferences">Preferences</a></li>
</svelte:fragment>

<slot/>
</SidebarFrame>