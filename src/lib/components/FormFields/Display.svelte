<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Field } from 'svelte-forms/types';
	import BaseLabel from './BaseLabel.svelte';
	import { makeDefaultController, type FormField, getErrorMessage, getValidationState } from '.';
	import { onMount } from 'svelte';

	export let definition: FormField;
	export let value: unknown = undefined;
	export let controller: Writable<Field<unknown>> & { validate: () => void } =
		makeDefaultController(definition, value);

	const { name, label, required, description } = definition;

	let helpText: string | undefined;
	let validationState: 'invalid' | 'valid' | undefined;
	onMount(() =>
		controller.subscribe((fieldState) => {
			value = fieldState.value;
			helpText = getErrorMessage(fieldState.errors, definition) ?? description;
			validationState = getValidationState(fieldState);
		})
	);
</script>

<label class="label max-w-md my-6">
	<BaseLabel {required} for={`input-${name}`}>{label}</BaseLabel>
	<input
		{name}
		class="input"
		readonly
		type="text"
		bind:value={$controller.value}
		id="input-{name}"
		aria-describedby={helpText ? `description-${name}` : undefined}
		required={required ? true : false}
	/>
	{#if helpText}<p id={`description-${name}`} class="opacity-50">{helpText}</p>{/if}
</label>
