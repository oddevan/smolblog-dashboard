<script>
	import SidebarFrame from "../SidebarFrame.svelte";
</script>

<SidebarFrame>
<ul class="nav nav-pills flex-column" slot="content-nav">
	<li class="nav-item"><a class="nav-link" href="/content">Published</a></li>
	<li class="nav-item"><a class="nav-link" href="/content/drafts">Drafts</a></li>
	<li class="nav-item"><a class="nav-link" href="/content/new">Add New</a></li>
</ul>

<slot/>
</SidebarFrame>