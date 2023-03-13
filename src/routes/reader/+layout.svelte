<script>
	import SidebarFrame from "../SidebarFrame.svelte";
</script>

<SidebarFrame>
<ul class="nav nav-pills flex-column" slot="reader-nav">
	<li class="nav-item"><a class="nav-link" href="/reader">Unread</a></li>
	<li class="nav-item"><a class="nav-link" href="/reader/all">All Items</a></li>
	<li class="nav-item"><a class="nav-link" href="/reader/manage">Manage</a></li>
</ul>

<slot/>
</SidebarFrame>