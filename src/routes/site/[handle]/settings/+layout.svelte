<script lang="ts">
	import SidebarFrame from "../../../SidebarFrame.svelte";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
</script>

<SidebarFrame site={data.currentSite}>
<ul class="nav nav-pills flex-column" slot="settings-nav">
	<li class="nav-item"><a class="nav-link" href="/settings">General</a></li>
	<li class="nav-item"><a class="nav-link" href="/settings/syndication">Syndication</a></li>
	<li class="nav-item"><a class="nav-link" href="/settings/permissions">Permissions</a></li>
	<li class="nav-item"><a class="nav-link" href="/settings/data">Data</a></li>
</ul>

<slot/>
</SidebarFrame>