<script lang="ts">
	import AccountSidebar from "$lib/components/AccountSidebar.svelte";
import SiteDisplay from "$lib/components/SiteDisplay.svelte";
import type { PageData } from "./$types";

	export let data: PageData;

	const { context, userSites } = data;
</script>

<div class="flex justify-center flex-row w-full space-x-3">
	<div class="sm:w-2/3 md:w-1/2 lg:w-5/12 xl:w-1/3">
			<h2 class="card-header h4">
				Select a site
			</h2>
			<div class="space-y-2">
					{#each userSites ?? [] as site (site.id)}
						<SiteDisplay {site}/>
					{/each}
			</div>
	</div>
	<div class="sm:w-1/3 md:w-1/4 xl:w-1/6">
		<AccountSidebar/>
	</div>
</div>

<h4>Context</h4>
<dl class="row">
	<dt class="col-sm-3">apiBase:</dt>
	<dd class="col-sm-9">{context?.apiBase}</dd>
	<dt class="col-sm-3">authHeader:</dt>
	<dd class="col-sm-9">{context?.authHeader}</dd>
</dl>
