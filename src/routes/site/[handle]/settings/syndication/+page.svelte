<script lang="ts">
	import Channel from "./Channel.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	const { initialData } = data;
</script>

{#each initialData as channel (channel.id)}
	<Channel {channel}/>
{/each}

