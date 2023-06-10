<script lang="ts" context="module">
	export interface FormPartState {
		payload: any;
		dirty: boolean;
		valid: boolean;
	}
</script>

<script lang="ts">
	import { form as makeForm } from 'svelte-forms';
	import { makeDefaultController, type FormField } from './BaseField.svelte';
	import { onMount } from 'svelte';
	import { Basic, Markdown } from '.';
	import type { Writable } from 'svelte/store';
	import type { Field } from 'svelte-forms/types';

	export let fieldClass = '';
	export let definition: FormField[];
	export let initialData: any = {};
	export let partState: FormPartState = {
		payload: {},
		valid: true,
		dirty: false
	};

	const fields = definition.map((def) => makeDefaultController(def, initialData[def.name]));
	const formController = makeForm(...fields);
	const getFieldController = (fieldName: string) =>
		formController.getField(fieldName) as Writable<Field<string>> & { validate: () => void };

	onMount(() =>
		formController.subscribe((formVal) => {
			partState = {
				payload: formVal.summary,
				valid: formVal.valid,
				dirty: formVal.dirty
			};
		})
	);
</script>

<div class={$$props.class}>
	{#each definition as fieldDef (fieldDef.name)}
		{@const { name, type } = fieldDef}
		<div class={fieldClass}>
			{#if type === 'markdown'}
				<Markdown definition={fieldDef} controller={getFieldController(name)} />
			{:else}
				<Basic definition={fieldDef} controller={getFieldController(name)} />
			{/if}
		</div>
	{/each}
</div>
