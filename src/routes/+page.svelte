<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
	console.log({data});

	const { context, userSites } = data;
</script>

<div class="row">
	<div class="col-sm">
		<div class="list-group list-group-flush">
				{#each userSites ?? [] as site (site.id)}
				<a
					class="list-group-item list-group-item-action"
					href="/site/{site.handle}"
				>
					{site.displayName}<br>
					<small class="text-body-tertiary">{site.baseUrl}</small>
				</a>
				{/each}
		</div>
	</div>
</div>

<h4>Context</h4>
<dl class="row">
	<dt class="col-sm-3">apiBase:</dt>
	<dd class="col-sm-9">{context?.apiBase}</dd>
	<dt class="col-sm-3">authHeader:</dt>
	<dd class="col-sm-9">{context?.authHeader}</dd>
</dl>
