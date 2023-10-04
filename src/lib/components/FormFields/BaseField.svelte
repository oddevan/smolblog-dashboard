<script lang="ts">
	import { makeDefaultController, type FormField, getErrorMessage, getValidationState, type FormFieldProps, type FieldController } from '.';
	import { onMount } from 'svelte';

	interface $$Props extends FormFieldProps {
		hideLabel?: boolean,
		hideHelp?: boolean,
	};

	export let hideLabel = false;
	export let hideHelp = false;

	export let definition: FormField;
	export let value: unknown = undefined;
	export let controller: FieldController<unknown> = makeDefaultController(definition, value);

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
	<span class:sr-only={hideLabel}>
		{#if required}<span class="text-red-500 dark:text-red-600">*</span> {/if}
		{label}
	</span>
	<slot {helpText} {validationState} />
	{#if helpText && !hideHelp}<p id={`description-${name}`} class="opacity-50">{helpText}</p>{/if}
</label>
