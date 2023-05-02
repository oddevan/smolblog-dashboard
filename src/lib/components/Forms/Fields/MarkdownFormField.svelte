<script lang="ts">
	import type { Writable } from "svelte/store";
	import type { FormField } from "../Form.svelte";
	import type { Field } from 'svelte-forms/types';
	import MarkdownField from "$lib/components/MarkdownField.svelte";

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
	<div class="col-lg-10 col-lg-offet-2">
		<MarkdownField
			identifier={name}
			bind:value={$controller.value}
			placeholder={label}
		/>
		{#if description}
		<span
			class="form-text"
			class:invalid-feedback={$controller.invalid}
			id="description-{name}"
		>{description}</span>
		{/if}
	</div>
</div>