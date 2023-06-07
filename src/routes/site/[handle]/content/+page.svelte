<script lang="ts">
	import type { PageData } from './$types';
	import ContentRow from './ContentRow.svelte';

	export let data: PageData;
	const { initialData, currentSite } = data;
	const baseUrl = currentSite?.baseUrl ?? '';
</script>

{#each initialData as row (row.id)}
	<ContentRow {row} {baseUrl} />
{/each}
