<script lang="ts">
	import type { PageData } from "./$types";
	import UserPerm from "./UserPerm.svelte";

	export let data: PageData;
	const { context, initialData } = data;
</script>

{#each initialData ?? [] as perm (perm.user.id)}
	<UserPerm line={perm}/>
{/each}