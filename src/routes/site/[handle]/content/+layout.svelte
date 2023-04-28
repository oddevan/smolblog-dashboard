<script lang="ts">
	import SidebarFrame from "../../../SidebarFrame.svelte";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
</script>

<SidebarFrame site={data.currentSite}>
<ul class="nav nav-pills flex-column" slot="content-nav">
	<li class="nav-item"><a class="nav-link" href="/content">Published</a></li>
	<li class="nav-item"><a class="nav-link" href="/content/drafts">Drafts</a></li>
	<li class="nav-item"><a class="nav-link" href="/content/new">Add New</a></li>
</ul>

<slot/>
</SidebarFrame>