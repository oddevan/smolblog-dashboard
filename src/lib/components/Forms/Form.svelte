<script lang="ts" context="module">
	export interface FormField {
		name: string,
		label: string,
		type: 'text'|'display'|'switch'|'hidden',
		description?: string,
		required?: boolean,
	};

	export interface FormState {
		saving: boolean,
		success: boolean,
		saveError?: Error,
	};
</script>

<script lang="ts">
  import { form as makeForm, field as makeField, type Validator } from 'svelte-forms';
  import { required as requiredValidator } from 'svelte-forms/validators';
	import { writable } from "svelte/store";
	import CardForm from './CardForm.svelte';
	import LineForm from './LineForm.svelte';
	import { onMount } from 'svelte';

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

	const state = writable<FormState>({
		saving: false,
		success: false,
	});

	const handleSubmit = async () => {
		if (!setter) { return; }

		state.set({ saving: true, success: false });

		try {
			formController.validate();
			if ($formController.valid) {
				await setter($formController.summary);
				state.set({ saving: false, success: true });
			}
		} catch (e) {
			state.set({ saving: false, success: false, saveError: e as Error});
		}
	}

	export let type: 'card'|'line' = 'card';
</script>

<form on:submit|preventDefault={handleSubmit}>
	{#if type === 'card'}
		<CardForm {state} {definition} {formController}/>
	{:else if type === 'line'}
		<LineForm {state} {definition} {formController}/>
	{/if}
</form>