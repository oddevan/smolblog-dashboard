<script lang="ts">
	import SidebarFrame from "../../../SidebarFrame.svelte";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
	const { currentSite } = data;
	const { handle } = currentSite ?? {};
</script>

<SidebarFrame site={currentSite}>
<ul class="nav nav-pills flex-column" slot="settings-nav">
	<li class="nav-item"><a class="nav-link" href="/site/{handle}/settings">General</a></li>
	<li class="nav-item"><a class="nav-link" href="/site/{handle}/settings/syndication">Syndication</a></li>
	<li class="nav-item"><a class="nav-link" href="/site/{handle}/settings/data">Data</a></li>
</ul>

<slot/>
</SidebarFrame>