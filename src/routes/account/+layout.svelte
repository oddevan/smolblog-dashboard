<script>
	import SidebarFrame from "../SidebarFrame.svelte";
</script>

<SidebarFrame>
<ul class="nav nav-pills flex-column" slot="account-nav">
	<li class="nav-item"><a class="nav-link" href="/account">Profile</a></li>
	<li class="nav-item"><a class="nav-link" href="/account/security">Security</a></li>
	<li class="nav-item"><a class="nav-link" href="/account/connections">Connecitons</a></li>
</ul>

<slot/>
</SidebarFrame>