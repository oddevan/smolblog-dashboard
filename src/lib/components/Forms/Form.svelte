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

	export let setter: ((arg0: any) => Promise<any>)|undefined;
	let enableSave = true;
	let saving = false;
	let success = false;
	let setError: Error|undefined;

	const handleSubmit = async () => {
		success = false;
		setError = undefined;

		formController.validate();
		if ($formController.valid && setter) {
			saving = true;
			try {
				await setter($formController.summary);
				saving = false;
				success = true;
			} catch (e) {
				setError = e as Error;
			}
		}
	}

	$: enableSave = !saving && $formController.dirty;

</script>

<form on:submit|preventDefault={handleSubmit}>
	<div class="card">
		<div class="card-body">
		{#each definition as field (field.name)}
			{#if field.type == 'text'}
				<TextField definition={field} controller={formController.getField(field.name)} />
			{:else if field.type == 'display'}
				<DisplayField definition={field} controller={formController.getField(field.name)} />
			{/if}
		{/each}
		<ErrorBox error={setError}/>
		</div>
		<div class="card-footer d-flex">
			{#if success}
				<span class="text-success">Saved successfully!</span>
			{/if}
			{#if setter}
			<button class="btn btn-primary ms-auto" disabled={!enableSave}>
				{#if saving}
				<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				Saving...
				{:else}
				Save
				{/if}
			</button>
			{/if}
		</div>
	</div>
</form>