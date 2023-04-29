<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
	const { context, initialData } = data;
</script>

<ul>
{#each initialData ?? [] as perm (perm.user.id)}
	{@const { user: { id, displayName, handle }, isAdmin } = perm}
	<li>{displayName} ({handle}) is {#if !isAdmin}not {/if} an administrator.</li>
{/each}
</ul>