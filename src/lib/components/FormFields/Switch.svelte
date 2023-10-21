<script lang="ts">
	import { makeDefaultController, type FormField, type FieldController, type FormFieldProps, getErrorMessage, getValidationState } from '.';
	import ToggleSwitch from '../ToggleSwitch.svelte';

	interface $$Props extends FormFieldProps {};

	export let definition: FormField;
	export let value: unknown = undefined;
	export let controller: FieldController<unknown> = makeDefaultController(definition, value);

	const { name, label, required, description } = definition;
	let helpText: string | undefined;

	let typedController = controller as FieldController<boolean>;
	$: helpText = getErrorMessage($typedController.errors, definition) ?? description;
</script>

<ToggleSwitch
	{name}
	bind:checked={$typedController.value}
	id="input-{name}"
	aria-describedby={helpText ? `description-${name}` : undefined}
	required={required ? true : false}
>
	{#if required}<span class="text-red-500 dark:text-red-600">*</span> {/if}
	{label}
</ToggleSwitch>
{#if helpText}
	<p id={`description-${name}`} class="opacity-50">{helpText}</p>
{/if}