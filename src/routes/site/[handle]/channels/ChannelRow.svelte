<script lang="ts">
	import ConnectionType from "$lib/components/ConnectionType.svelte";
	import { makeDefaultController } from "$lib/components/FormFields";
	import ToggleSwitch from "$lib/components/ToggleSwitch.svelte";
	import Smolblog from "$lib/smolblog";
	import type { ConnectorChannelPlusLink, SmolblogContext } from "$lib/smolblog/types";
	import { form } from "svelte-forms";

	export let channel: ConnectorChannelPlusLink;
	export let siteId: string;
	export let context: SmolblogContext;

	const controller = form(
		makeDefaultController({ name: 'channelId', label: 'Channel', type: 'hidden'}, channel.id),
		makeDefaultController({ name: 'siteId', label: 'Site', type: 'hidden'}, siteId),
		makeDefaultController({ name: 'pull', label: 'Enable Pull', type: 'switch' }, channel.canPull),
		makeDefaultController({ name: 'push', label: 'Enable Push', type: 'switch' }, channel.canPush),
	);
	const pullController = controller.getField('pull');
	const pushController = controller.getField('push');

	let loading = false;

	const goSave = () => {
		loading = true;

		Smolblog(context).site(siteId)?.setChannel(channel.id, $pushController.value, $pullController.value)
			.finally(() => loading = false);
	}
</script>

<tr>
	<td class="table-cell-fit"><ConnectionType provider={channel.connectionProvider ?? ''} /></td>
	<td>{channel.displayName}</td>
	<td><ToggleSwitch name="pull" size="md" bind:checked={$pullController.value}><span class="hidden sm:inline">Enable </span>Pull</ToggleSwitch></td>
	<td><ToggleSwitch name="push" size="md" bind:checked={$pushController.value}><span class="hidden sm:inline">Enable </span>Push</ToggleSwitch></td>
	<td><button on:click={goSave} class="btn variant-filled-primary" disabled={!$controller.dirty && !loading}>Save</button></td>
</tr>