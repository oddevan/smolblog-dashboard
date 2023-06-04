<script lang="ts">
	import SidebarFrame from "../SidebarFrame.svelte";
</script>

<SidebarFrame>
<svelte:fragment slot="account-nav">
	<li class="nav-item"><a class="nav-link" href="/account">Profile</a></li>
	<li class="nav-item"><a class="nav-link" href="/account/connections">Connections</a></li>
	<li class="nav-item"><a class="nav-link" href="/account/preferences">Preferences</a></li>
</svelte:fragment>

<slot/>
</SidebarFrame>