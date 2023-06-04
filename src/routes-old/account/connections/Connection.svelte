<script lang="ts">
	import Icon from "../../../lib/components/Icon.svelte";
	import type { ConnectorConnection } from "../../../lib/smolblog/types";

	export let connection: ConnectorConnection;
</script>

<style>
	.connection {
		border: 1px solid grey;
		border-bottom: none;
		margin: 0;
	}

	.connection:last-child {
		border-bottom: 1px solid grey;
	}
</style>

<div class="row connection">
	<div class="col-sm-8">
		<Icon icon={connection.provider} />
		{connection.displayName}
	</div>
	<div class="col-sm-4">
		<button class="btn btn-outline-secondary btn-sm">Refresh</button>
		<button class="btn btn-outline-danger btn-sm">Remove</button>
	</div>
	{#each connection.channels as channel}
	<div class="col-sm-10 offset-sm-2">
		{channel.displayName}
	</div>
	{/each}
</div>