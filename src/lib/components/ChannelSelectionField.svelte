<script lang="ts">
	import { makeDefaultController, type FormField, type FieldController, type FormFieldProps } from './FormFields';
	import ToggleSwitch from './ToggleSwitch.svelte';
	import ConnectionType from './ConnectionType.svelte';

	interface $$Props extends FormFieldProps {};

	export let definition: FormField;
	export let value: unknown = [];
	export let controller: FieldController<unknown> = makeDefaultController(definition, value);

	const { name } = definition;
	let groupVal: string[] = value as string[] ?? [];
	$: $controller.value = groupVal;

	const channels = [
		{id: '703330fa-06aa-454c-9fec-d82697d51e11', provider: 'tumblr', name: 'paperairplanemob'},
		{id: '70e6b3cf-256c-4498-a226-5c04d9c9354f', provider: 'tumblr', name: 'plotholefragments'},
		{id: 'f3fb7f14-5a56-4a08-8b65-1da81a8ca752', provider: 'microblog', name: 'oddevan.com'},
	];
</script>

<h5 class="my-3">Syndicate to:</h5>
{#each channels as channel (channel.id)}
	<ToggleSwitch {name} bind:group={groupVal} value={channel.id}>
		<span class="flex items-center">
			<ConnectionType provider={channel.provider} iconSize="small"/>
			{channel.name}
		</span>
	</ToggleSwitch>
{/each}