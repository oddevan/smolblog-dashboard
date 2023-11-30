<script lang="ts">
	import { makeDefaultController, type FormField, type FieldController, type FormFieldProps } from '.';
	import BaseField from './BaseField.svelte';

	interface $$Props extends FormFieldProps {};

	export let definition: FormField;
	export let value: unknown = undefined;
	export let controller: FieldController<unknown> = makeDefaultController(definition, value);

	const { name, required, attributes } = definition;
</script>

<BaseField {definition} bind:value {controller} let:validationState let:helpText>
	<select
		{name}
		class="select"
		class:input-error={validationState === 'invalid'}
		bind:value={$controller.value}
		id="input-{name}"
		aria-describedby={helpText ? `description-${name}` : undefined}
		required={required ? true : false}
	>
		{#each attributes?.objects ?? [] as obj }
			<option value={obj.value}>{obj.display}</option>
		{/each}
	</select>
</BaseField>