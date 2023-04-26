<script lang="ts" context="module">
	import { onMount, type ComponentType, getContext } from "svelte";

	export interface FormField {
		name: string,
		label: string,
		type: 'text'|'display',
		description?: string,
		component?: ComponentType,
		required?: boolean,
	};
</script>

<script lang="ts">
  import { form as makeForm, field as makeField, type Validator } from 'svelte-forms';
  import { required as requiredValidator } from 'svelte-forms/validators';
	import TextField from './TextField.svelte';
	import DisplayField from './DisplayField.svelte';
	import ErrorBox from '../ErrorBox.svelte';

	export let definition: FormField[];
	export let initialData: any = {};

	const fields = definition.map(fieldDef => {
		const { name, required } = fieldDef;

		const value = initialData[fieldDef.name] ?? '';
		const validators: Validator[] = [];

		if (required) { validators.push(requiredValidator()); }

		return makeField(name, value, validators);
	});
	const formController = makeForm(...fields)

	export let getter: (() => Promise<any>) | undefined = undefined;
	let loading = false;
	let getError: Error|undefined;

	export let setter: ((arg0: any) => Promise<void>);
	let saving = false;
	let setError: Error|undefined;

	onMount(() => formController.subscribe(frm => console.log(frm)));

	const handleSubmit = () => {
		formController.validate();
		if ($formController.valid) {
			
		}
	}

</script>

<form on:submit|preventDefault={handleSubmit}>
	{#if getError}
		<ErrorBox error={getError}/>
	{/if}
	{#each definition as field (field.name)}
		{#if field.type == 'text'}
			<TextField definition={field} controller={formController.getField(field.name)} />
		{:else if field.type == 'display'}
			<DisplayField definition={field} controller={formController.getField(field.name)} />
		{/if}
	{/each}
</form>