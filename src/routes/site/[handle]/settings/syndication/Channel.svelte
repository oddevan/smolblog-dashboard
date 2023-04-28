<script lang="ts">
	import Icon from "$lib/components/Icon.svelte";
	import type { ConnectorChannelPlusLink } from "$lib/smolblog/types";
	import type { SmolblogStore } from "$lib/stores/context";
	import { getContext, onMount } from "svelte";

	const context = getContext<SmolblogStore>('smolblog');

	export let channel: ConnectorChannelPlusLink;
	let push: boolean = channel.canPush;
	let pull: boolean = channel.canPull;

	let original = { push: false, pull: false };
	let enabled: boolean;
	$: enabled = original.push != push || original.pull != pull;

	const reset = () => original = { push, pull };
	const save = () => {
		enabled = false;
		$context.site?.settings.channels.link(channel.id, push, pull);
		reset();
	};

	onMount(reset);
</script>

<div class="row">
	<div class="col-sm-6">
		<Icon icon={channel.connectionProvider}/>
		{channel.connectionName}:
		{channel.displayName}
	</div>
	<div class="col-xs-4 col-sm-2">
		<div class="form-check form-switch">
			<label class="form-check-label" for="canPushSwitch">
				Push
			</label>
			<input class="form-check-input" type="checkbox" role="switch" id="canPushSwitch" bind:checked={push}>
		</div>
	</div>
	<div class="col-xs-4 col-sm-2">
		<div class="form-check form-switch">
			<label class="form-check-label" for="canPullSwitch">
				Pull
			</label>
			<input class="form-check-input" type="checkbox" role="switch" id="canPullSwitch" bind:checked={pull}>
		</div>
	</div>
	<div class="col-xs-4 col-sm-2">
		<button class="btn btn-sm btn-outline-primary" disabled={!enabled} on:click={save}>Save</button>
	</div>
</div>
