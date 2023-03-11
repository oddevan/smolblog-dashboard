<script>
	import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
	import { getUserConnections } from "../../../lib/smolblog/user";
	import Connection from "./Connection.svelte";

	const steps = [
		{path: '/', title: 'Dashboard'},
		{path: '/account', title: 'Account'},
	];
  
  const connections = getUserConnections();
</script>
<Breadcrumbs steps={steps} current="Connections" />

<h1>Connections</h1>

{#each connections as connection (connection.id) }
  <Connection connection={connection} />
{/each}
