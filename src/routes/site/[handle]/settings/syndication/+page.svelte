<script lang="ts">
	import Channel from './Channel.svelte';
	import type { PageData } from './$types';
	import Smolblog from '$lib/smolblog';

	export let data: PageData;

	const { context, currentSite, initialData } = data;
	const setter =
		context && currentSite
			? new Smolblog(context).site(currentSite.id).settings.channels.link
			: undefined;
</script>

{#each initialData as channel (channel.id)}
	<Channel {channel} {setter} />
{/each}
