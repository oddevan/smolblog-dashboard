<script lang="ts">
	import type { Readable, Writable } from "svelte/store";
	import type { FormField } from "./Form.svelte";
	import type { Field } from 'svelte-forms/types';

	export let definition: FormField;
	export let controller: Writable<Field<any>> & { validate: () => void };

	const { name, label, description: baseDescription, required } = definition;

	let description = '';
	$: if ($controller.errors.includes('required')) {
		description = 'This field is required.';
	} else {
		description = baseDescription ?? '';
	}
</script>

<div class="row mb-4">
	<label for="input-{name}" class="col-lg-2 col-form-label">
		{label}
		{#if required}<span class="text-danger">* <span class="visually-hidden">(required)</span></span>{/if}
	</label>
	<div class="col-lg">
		<input
			type="text"
			bind:value={$controller.value}
			on:blur={controller.validate}
			class="form-control"
			class:is-invalid={$controller.invalid}
			class:is-valid={$controller.dirty && $controller.valid}
			id="input-{name}"
			aria-describedby={description ? `description-${name}` : undefined}
			required={required ? true : false}
		>
		{#if description}
		<span
			class="form-text"
			class:invalid-feedback={$controller.invalid}
			id="description-{name}"
		>{description}</span>
		{/if}
	</div>
</div>