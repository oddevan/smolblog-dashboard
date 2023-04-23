<script lang="ts" context="module">
	import type { ComponentType } from "svelte";

	export interface FormField {
		name: string,
		label: string,
		type: 'text'|'display',
		description?: string,
		component?: ComponentType,
		required?: boolean,
	};
</script>

<script lang="ts">
  import { form, field, type Validator } from 'svelte-forms';
  import { required } from 'svelte-forms/validators';
	import TextField from './TextField.svelte';

	export let definition: FormField[];
	export let initialData: any = {};

	const fields = definition.filter(fieldDef => fieldDef.type != 'display').map(fieldDef => {
		const { name, required: isRequired } = fieldDef;

		const value = initialData[fieldDef.name] ?? '';
		const validators: Validator[] = [];

		if (isRequired) { validators.push(required()); }

		return field(name, value, validators);
	});
	const formController = form(...fields)

</script>

<form>
	{#each definition as field (field.name)}
		{#if field.type == 'text'}
			<TextField definition={field} controller={formController.getField(field.name)} />
		{:else if field.type == 'display'}
		{@const { name, label, description } = field}
		<div class="row mb-4">
			<label for="input-{name}" class="col-lg-2 col-form-label">{label}</label>
			<div class="col-lg">
				<input
					type="text"
					readonly
					class="form-control-plaintext"
					id="input-{name}"
					aria-describedby={description ? `description-${name}` : undefined}
					value={initialData[name] ?? ''}
				>
				{#if description}
				<span class="form-text" id="description-{name}">{description}</span>
				{/if}
			</div>
		</div>
		{/if}
	{/each}
</form>