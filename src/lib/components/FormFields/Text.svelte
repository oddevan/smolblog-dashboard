<script lang="ts">
	import BaseField, { type FormField } from "./BaseField.svelte";
	import type { Writable } from "svelte/store";
	import type { Field } from 'svelte-forms/types';
	import { Input } from "flowbite-svelte";
	import BaseLabel from "./BaseLabel.svelte";
	import BaseHelper from "./BaseHelper.svelte";

	export let definition: FormField;
	export let controller: Writable<Field<any>> & { validate: () => void };

	const { name, label, required } = definition;
</script>

<BaseField {definition} {controller}>
	<div slot="field" let:helpText let:color>
		<BaseLabel {required} {color}>{label}</BaseLabel>
		<Input
			{color}
			{name}
			bind:value={$controller.value}
			id="input-{name}"
			aria-describedby={helpText ? `description-${name}` : undefined}
			required={required ? true : false}
		/>
		<BaseHelper {color} {helpText}/>
	</div>
</BaseField>