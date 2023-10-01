<script lang="ts">
	import { PUBLIC_DASHBOARD_URL } from "$env/static/public";
	import { Refresh, Site, Trash, Tumblr } from "$lib/components/Icons";
	import type { PageData } from "./$types";

	export let data: PageData;

	const returnTo = `${PUBLIC_DASHBOARD_URL}/account/connections`;
</script>

<style lang="postcss">
	/* .card-header {
		border-top-left-radius: var(--theme-rounded-container);
		border-top-right-radius: var(--theme-rounded-container);
	} */
</style>

{#each data.userConnections ?? [] as connection (connection.id)}
	<div class="card variant-soft">
		<header class="card-header variant-filled-surface flex align-middle pb-4 rounded-tl-container-token rounded-tr-container-token">
			<h3 class="flex sm:w-1/2 sm:inline-flex items-center">
				<Site size='medium' class="me-2" />
				<span>
					{connection.provider}:
					{connection.displayName}
				</span>
			</h3>
			<span class="block sm:inline sm:w-1/2 text-end">
				<button type="button" class="btn btn-sm variant-filled">
					<span><Refresh size='small'/></span>
					<span>Refresh</span>
				</button>
				<button type="button" class="btn btn-sm variant-filled-error">
					<span><Trash size='small'/></span>
					<span>Refresh</span>
				</button>
			</span>
		</header>
		<ul class="list p-4">
			{#each connection.channels as channel (channel.id)}
				<li>{channel.displayName}</li>
			{/each}
		</ul>
	</div>
{/each}

<h2 class="h2 mt-8 mb-6">Create new connection</h2>

<div class="logo-cloud grid-cols-1 md:!grid-cols-2 gap-1">
	<a class="logo-item" href="/">
		<span><Site size='medium' /></span>
		<span>Micro.blog</span>
	</a>
	<a class="logo-item" href="/">
		<span><Tumblr size='medium' /></span>
		<span>Tumblr</span>
	</a>
</div>