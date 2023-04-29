<script lang="ts">
	import type { Writable } from "svelte/store";
	import type { FormField } from "../Form.svelte";
	import type { Field } from "svelte-forms/types";

	export let definition: FormField;
	export let controller: Writable<Field<any>> & { validate: () => void };

	const { name, label, description } = definition;
</script>

<div class="row mb-4">
	<label for="input-{name}" class="col-lg-2 col-form-label">{label}</label>
	<div class="col-lg">
		<input
			type="text"
			readonly
			class="form-control-plaintext"
			id="input-{name}"
			aria-describedby={description ? `description-${name}` : undefined}
			bind:value={$controller.value}
		>
		{#if description}
		<span class="form-text" id="description-{name}">{description}</span>
		{/if}
	</div>
</div>