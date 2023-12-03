<script lang="ts">
	import { makeDefaultController, type FormField, type FieldController, type FormFieldProps } from './FormFields';
	import ToggleSwitch from './ToggleSwitch.svelte';
	import ConnectionType from './ConnectionType.svelte';
	import type { ConnectorChannel } from '$lib/smolblog/types';

	interface $$Props extends FormFieldProps {};

	export let definition: FormField;
	export let value: unknown = [];
	export let controller: FieldController<unknown> = makeDefaultController(definition, value);

	let { name, attributes } = definition;
	let channels: ConnectorChannel[] = attributes?.channels ?? [] as ConnectorChannel[];

	let checkedMap: Record<string, boolean> = {};
	channels.forEach((channel) => {
		checkedMap[channel.id] = ($controller.value as string[])?.includes(channel.id) ?? false;
	});

	$: $controller.value = Object.keys(checkedMap).filter((id) => checkedMap[id]);
</script>

<h5 class="my-3">Syndicate to:</h5>
{#each channels as channel (channel.id)}
	<ToggleSwitch {name} bind:checked={checkedMap[channel.id]}>
		<span class="flex items-center">
			<ConnectionType provider={channel.connectionProvider ?? ''} iconSize="small"/>
			{channel.displayName}
		</span>
	</ToggleSwitch>
{/each}