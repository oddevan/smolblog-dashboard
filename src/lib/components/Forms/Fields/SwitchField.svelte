<script lang="ts">
	import type { Writable } from "svelte/store";
	import type { FormField } from "../Form.svelte";
	import type { Field } from "svelte-forms/types";

	export let definition: FormField;
	export let controller: Writable<Field<any>> & { validate: () => void };

	const { name, label, description: baseDescription, required } = definition;
</script>

<div class="col-4">
	<div class="form-check form-switch">
		<label class="form-check-label" for="{name}Switch">
			{label}
			{#if required}<span class="text-danger">* <span class="visually-hidden">(required)</span></span>{/if}
		</label>
		<input class="form-check-input" type="checkbox" role="switch" id="{name}Switch" bind:checked={$controller.value}>
	</div>
</div>