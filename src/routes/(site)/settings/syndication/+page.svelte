<script lang="ts">
	import Loading from "$lib/components/Loading.svelte";
	import type { ConnectorChannelPlusLink } from "$lib/smolblog/types";
	import context from "$lib/stores/context";
	import { onMount } from "svelte";
	import Channel from "./Channel.svelte";


	let loading = true;
	let availabeChannels: ConnectorChannelPlusLink[] = [];

	onMount(() => {
		return context.subscribe(async api => {
			loading = true;
			availabeChannels = await api?.site?.settings.channels.get() ?? [];
			loading = false;
		});
	});
</script>

{#if loading}
	<Loading/>
{:else}
	{#each availabeChannels as channel (channel.id)}
		<Channel {channel}/>
	{/each}
{/if}

