<script lang="ts">
	import { form as makeForm } from 'svelte-forms';
	import type { FormField, FieldController } from '../FormFields';
	import { onMount } from 'svelte';
	import { makeDefaultController, Markdown, Text, Email, Display, Url, File, Multitext, DateTime } from '../FormFields';
	import type { FormPartState } from '.';
	import Identifier from '../FormFields/Identifier.svelte';
	import Switch from '../FormFields/Switch.svelte';
	import MediaField from '../FormFields/MediaField.svelte';

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
		formController.getField(fieldName) as FieldController<unknown>;

	onMount(() => formController.subscribe((formVal) => {
			partState = {
				payload: formVal.summary,
				valid: formVal.valid,
				dirty: formVal.dirty
			};
		}));
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
			{:else if type === 'datetime'}
				<DateTime definition={fieldDef} controller={getFieldController(name)} />
			{:else if type === 'identifier'}
				<Identifier definition={fieldDef} controller={getFieldController(name)} />
			{:else if type === 'switch'}
				<Switch definition={fieldDef} controller={getFieldController(name)} />
			{:else if type === 'media'}
				<MediaField definition={fieldDef} controller={getFieldController(name)} />
			{/if}
		</div>
	{/each}
</div>
