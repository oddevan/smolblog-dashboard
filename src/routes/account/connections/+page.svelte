<script lang="ts">
	import Connection from "./Connection.svelte";
	import context from "$lib/stores/context";
	import Loading from "$lib/components/Loading.svelte";
	import ErrorBox from "$lib/components/ErrorBox.svelte";

	let err: Error|undefined;

	const getKickoffFunction = (provider: string) => {
		return () => {
			$context?.user?.connections.init('microblog').
				then(url => window.location.href = url).
				catch(exc => err = exc);
		};
	};
</script>

{#await $context?.user?.connections.get() ?? []}
	<Loading />
{:then connections}
	{#each connections as connection (connection.id) }
		<Connection connection={connection} />
	{/each}
{:catch error}
	<ErrorBox {error} />
{/await}

{#if err}
	<ErrorBox error={err} />
{/if}

<h3>Connect</h3>

<button on:click={getKickoffFunction('microblog')} class="btn btn-primary">Connect to Micro.blog</button>