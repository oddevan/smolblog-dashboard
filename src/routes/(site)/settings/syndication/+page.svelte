<script lang="ts">
	import Loading from "$lib/components/Loading.svelte";
	import type { ConnectorChannelPlusLink } from "$lib/smolblog/types";
	import { getContext, onMount } from "svelte";
	import Channel from "./Channel.svelte";
	import type { SmolblogStore } from "$lib/stores/context";

	const context = getContext<SmolblogStore>('smolblog');

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

