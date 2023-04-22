<script lang="ts">
	import Icon from "$lib/components/Icon.svelte";
import type { ConnectorChannel } from "$lib/smolblog/types";
	import context from "$lib/stores/context";
	import { onMount } from "svelte";

	export let channel: ConnectorChannel;
	export let provider: string;
	export let connection: string;
	export let push: boolean = false;
	export let pull: boolean = false;

	let original: { push: boolean, pull: boolean };

	const reset = () => original = { push, pull };
	const enabled = () => original.push != push || original.pull != pull;
	const save = () => {
		$context.site?.settings.channels.link(channel.id, push, pull);
		reset();
	};

	onMount(reset);
</script>

<div class="row">
	<div class="col-sm-6">
		<Icon icon={provider}/>
		{connection}
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
		<button class="btn btn-sm btn-outline-primary" disabled={!enabled()} on:click={save}>Save</button>
	</div>
</div>
