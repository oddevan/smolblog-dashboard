<script lang="ts">
	import Connection from "./Connection.svelte";
	import context from "$lib/stores/context";
	import Loading from "$lib/components/Loading.svelte";
	import Error from "$lib/components/Error.svelte";
</script>

{#await $context?.user?.connections.get() ?? []}
	<Loading />
{:then connections}
	{#each connections as connection (connection.id) }
		<Connection connection={connection} />
	{/each}
{:catch error}
	<Error {error} />
{/await}