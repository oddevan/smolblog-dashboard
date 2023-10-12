<script lang="ts">
	import { makeDefaultController, type FormField, type FieldController, type FormFieldProps } from './FormFields';
	import ToggleSwitch from './ToggleSwitch.svelte';
	import ConnectionType from './ConnectionType.svelte';
	import type { ConnectorChannel } from '$lib/smolblog/types';

	interface $$Props extends FormFieldProps {};

	export let definition: FormField;
	export let value: unknown = [];
	export let controller: FieldController<unknown> = makeDefaultController(definition, value);

	const { name, attributes } = definition;
	const channels = attributes?.channels ?? [] as ConnectorChannel[];
	let groupVal: string[] = value as string[] ?? [];
	$: $controller.value = groupVal;
</script>

<h5 class="my-3">Syndicate to:</h5>
{#each channels as channel (channel.id)}
	<ToggleSwitch {name} bind:group={groupVal} value={channel.id}>
		<span class="flex items-center">
			<ConnectionType provider={channel.connectionProvider ?? ''} iconSize="small"/>
			{channel.displayName}
		</span>
	</ToggleSwitch>
{/each}