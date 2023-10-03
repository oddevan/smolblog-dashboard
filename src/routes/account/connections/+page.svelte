<script lang="ts">
	import { PUBLIC_DASHBOARD_URL } from "$env/static/public";
	import ConnectionType from "$lib/components/ConnectionType.svelte";
	import { Refresh, Trash } from "$lib/components/Icons";
	import smolblog from "$lib/smolblog";
	import type { ConnectorConnection } from "$lib/smolblog/types";
	import { fade } from "svelte/transition";
	import type { PageData } from "./$types";

	export let data: PageData;
	const api = smolblog(data.context);

	let userConnections: ConnectorConnection[];
	userConnections = data.userConnections;

	const returnTo = `${PUBLIC_DASHBOARD_URL}/account/connections`;
	const connectionTypes = [
		'microblog',
		'tumblr',
	];

	let loading = false;
	let errorMessage: string|null = null;

	function wrap(func: (param: string) => Promise<void>, param: string) {
		loading = true;
		errorMessage = null;
		func(param)
			.catch((err) => errorMessage = err?.message ?? 'Something went wrong.')
			.finally(() => loading = false);
	}

	async function goConnect(provider: string) {
		const goto = await api.user.initConnection(provider, returnTo);
		window.location.href = goto;
	}
	async function refresh(id: string) {
		const refreshed = await api.user.connection(id).refresh();
		const ind = userConnections.findIndex((con) => con.id == refreshed.id);
		userConnections.splice(ind < 0 ? userConnections.length : ind, 1, refreshed);
		userConnections = userConnections;
	}
	async function del(id: string) {
		await api.user.connection(id).delete();
		userConnections = userConnections.filter((con) => con.id != id);
	}
</script>

<h2 class="h2 mb-4">External Connections</h2>

{#if errorMessage}
	<aside class="alert variant-filled-error" transition:fade|local={{ duration: 200 }}>
		<p class="alert-message">{errorMessage}</p>
	</aside>
{/if}

{#each userConnections ?? [] as connection (connection.id)}
	{@const { provider, displayName, id, channels } = connection}
	<div class="card variant-soft mb-4">
		<header class="card-header variant-filled-surface sm:flex align-middle pb-4 rounded-tl-container-token rounded-tr-container-token">
			<h3 class="flex w-full sm:w-1/2 sm:inline-flex items-center">
				<ConnectionType provider={provider} />
				<span>
					{displayName}
				</span>
			</h3>
			<span class="block w-full sm:inline sm:w-1/2 text-end">
				<button type="button" disabled={loading} class="btn btn-sm variant-filled" on:click={() => wrap(refresh, id)}>
					<span><Refresh size='small'/></span>
					<span>Refresh</span>
				</button>
				<button type="button" disabled={loading} class="btn btn-sm variant-filled-error" on:click={() => wrap(del, id)}>
					<span><Trash size='small'/></span>
					<span>Delete</span>
				</button>
			</span>
		</header>
		<ul class="list p-4">
			{#each channels as channel (channel.id)}
				<li>{channel.displayName}</li>
			{/each}
		</ul>
	</div>
{/each}

<h2 class="h2 mt-8 mb-6">Create new connection</h2>

<div class="logo-cloud grid-cols-1 sm:!grid-cols-3 lg:!grid-cols-5 gap-1">
{#each connectionTypes as provider }
	<button class="logo-item" disabled={loading} on:click={() => wrap(goConnect, provider)}>
		<ConnectionType {provider} withName/>
	</button>
{/each}
</div>