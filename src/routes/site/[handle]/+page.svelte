<script lang="ts">
	import SidebarFrame from "../../SidebarFrame.svelte";
import type { PageData } from "./$types";

	export let data: PageData;
</script>

<SidebarFrame site={data.currentSite}>
<p>this is the site dashboard page</p>
</SidebarFrame>
