<script lang="ts">
	import type { Readable, Writable } from "svelte/store";
	import type { FormField } from "./Form.svelte";
	import type { Field } from 'svelte-forms/types';

	export let definition: FormField;
	export let controller: Writable<Field<any>> | Readable<Field<any>>;

	const { name, label, description } = definition;
</script>

<div class="row mb-4">
	<label for="input-{name}" class="col-lg-2 col-form-label">{label}</label>
	<div class="col-lg">
		<input
			type="text"
			bind:value={$controller.value}
			class="form-control"
			id="input-{name}"
			aria-describedby={description ? `description-${name}` : undefined}
		>
		{#if description}
		<span class="form-text" id="description-{name}">{description}</span>
		{/if}
	</div>
</div>