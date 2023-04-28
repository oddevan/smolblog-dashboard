<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
	console.log({data});

	const { context, userSites } = data;
</script>

<div class="row justify-content-center">
	<div class="col-sm col-md-6 col-lg-5 col-xl-4">
		<div class="card">
			<h2 class="card-header h4">
				Select a site
			</h2>
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
	<div class="col-sm col-md-3 col-xl-2">
		<div class="card">
			<h2 class="card-header h4">
				My account
			</h2>
			<div class="list-group list-group-flush">
				<a class="list-group-item list-group-item-action" href="/account">Profile</a>
				<a class="list-group-item list-group-item-action" href="/account/security">Security</a>
				<a class="list-group-item list-group-item-action" href="/account/connections">Connections</a>
				<a class="list-group-item list-group-item-action" href="/account/preferences">Preferences</a>
			</div>
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
