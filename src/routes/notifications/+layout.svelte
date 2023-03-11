<script>
	import SidebarFrame from "../SidebarFrame.svelte";
</script>

<SidebarFrame>
<ul class="nav nav-pills flex-column" slot="notifications-nav">
	<li class="nav-item"><a class="nav-link" href="/notifications">Inbox</a></li>
	<li class="nav-item"><a class="nav-link" href="/notifications/settings">Notification Settings</a></li>
</ul>

<slot/>
</SidebarFrame>