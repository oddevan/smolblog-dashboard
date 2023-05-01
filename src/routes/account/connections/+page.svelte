<script lang="ts">
	import Connection from "./Connection.svelte";
	import Loading from "$lib/components/Loading.svelte";
	import ErrorBox from "$lib/components/ErrorBox.svelte";
	import type { PageData } from "./$types";
	import Smolblog from "$lib/smolblog";

	export let data: PageData;

	const { context, initialData } = data;

	let err: Error|undefined;

	const getKickoffFunction = (provider: string) => {
		if (!context?.authHeader) { return () => console.error('Context not initialized.'); }

		return () => {
			const api = new Smolblog(context);

			api.user?.connections.init(provider).
				then(url => window.location.href = url).
				catch(exc => err = exc);
		};
	};
</script>

{#each initialData as connection (connection.id) }
	<Connection connection={connection} />
{/each}

<h3>Connect</h3>

{#if err}
	<ErrorBox error={err} />
{/if}

<button on:click={getKickoffFunction('microblog')} class="btn btn-primary">Connect to Micro.blog</button>