<script lang="ts">
	import { makeDefaultController, type FormField, getErrorMessage, getValidationState, type FormFieldProps, type FieldController } from '.';
	import BaseField from './BaseField.svelte';

	interface $$Props extends FormFieldProps {};

	export let definition: FormField;
	export let value: unknown = undefined;
	export let controller: FieldController<unknown> = makeDefaultController(definition, value);

	const { name, required } = definition;
</script>

<BaseField {definition} bind:value {controller} let:helpText>
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
</BaseField>
