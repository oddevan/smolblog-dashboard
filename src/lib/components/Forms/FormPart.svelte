<script lang="ts">
	import { form as makeForm } from 'svelte-forms';
	import { makeDefaultController, type FormField, Markdown } from '../FormFields';
	import { onMount } from 'svelte';
	import { Text, Email, Display, Url, File } from '../FormFields';
	import type { Writable } from 'svelte/store';
	import type { Field } from 'svelte-forms/types';
	import type { FormPartState } from '.';
	import Multitext from '../FormFields/Multitext.svelte';

	export let fieldClass = '';
	export let definition: FormField[];
	export let initialData: Record<string, unknown> = {};
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
		{@const { name, type, component } = fieldDef}
		<div class={fieldClass}>
			{#if component}
				<svelte:component this={component} definition={fieldDef} controller={getFieldController(name)} />
			{:else if type === 'markdown'}
				<Markdown definition={fieldDef} controller={getFieldController(name)} />
			{:else if type === 'email'}
				<Email definition={fieldDef} controller={getFieldController(name)} />
			{:else if type === 'display'}
				<Display definition={fieldDef} controller={getFieldController(name)} />
			{:else if type === 'text'}
				<Text definition={fieldDef} controller={getFieldController(name)} />
			{:else if type === 'url'}
				<Url definition={fieldDef} controller={getFieldController(name)} />
			{:else if type === 'file'}
				<File definition={fieldDef} controller={getFieldController(name)} />
			{:else if type === 'multitext'}
				<Multitext definition={fieldDef} controller={getFieldController(name)} />
			{/if}
		</div>
	{/each}
</div>
