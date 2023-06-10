<script lang="ts">
	import BaseField, { makeDefaultController, type FormField } from './BaseField.svelte';
	import type { Writable } from 'svelte/store';
	import type { Field } from 'svelte-forms/types';
	import { Input } from 'flowbite-svelte';
	import BaseLabel from './BaseLabel.svelte';
	import BaseHelper from './BaseHelper.svelte';
	import type { InputType } from 'flowbite-svelte/dist/types';

	export let definition: FormField;
	export let value: any = undefined;
	export let controller: Writable<Field<any>> & { validate: () => void } = makeDefaultController(
		definition,
		value
	);

	const { name, label, required, type: defType } = definition;
	const type: InputType = ['text', 'password'].includes(defType) ? (defType as InputType) : 'text';

	$: value = $controller.value;
</script>

<BaseField {definition} {controller}>
	<div slot="field" let:helpText let:color>
		<BaseLabel {required} {color}>{label}</BaseLabel>
		<Input
			{color}
			{name}
			{type}
			bind:value={$controller.value}
			id="input-{name}"
			aria-describedby={helpText ? `description-${name}` : undefined}
			required={required ? true : false}
		/>
		<BaseHelper {color} {helpText} />
	</div>
</BaseField>
