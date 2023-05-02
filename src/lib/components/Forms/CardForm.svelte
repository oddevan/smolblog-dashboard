<script lang="ts">
	import type { Readable, Writable } from "svelte/store";
	import TextField from "./Fields/TextField.svelte";
	import type { FormField, FormState } from "./Form.svelte";
	import type { Field } from "svelte-forms/types";
	import DisplayField from "./Fields/DisplayField.svelte";
	import ErrorBox from "../ErrorBox.svelte";
	import MarkdownFormField from "./Fields/MarkdownFormField.svelte";
	import SwitchField from "./Fields/SwitchField.svelte";

	export let state: Readable<FormState>;
	export let definition: FormField[];
	export let formController: Readable<{ dirty: boolean }> & {
		getField: (name: string) => Writable<Field<any>> & { validate: () => void }
	};

	let enableSave: boolean;
	$: enableSave = !$state.saving && $formController.dirty;
</script>

<div class="card">
	<div class="card-body">
	{#each definition as field (field.name)}
		{#if field.type == 'text'}
			<TextField definition={field} controller={formController.getField(field.name)} />
		{:else if field.type == 'display'}
			<DisplayField definition={field} controller={formController.getField(field.name)} />
		{:else if field.type == 'markdown'}
			<MarkdownFormField definition={field} controller={formController.getField(field.name)} />
		{:else if field.type == 'switch'}
			<div class="row mb-4 justify-content-end">
				<SwitchField definition={field} controller={formController.getField(field.name)} />
			</div>
		{/if}
	{/each}
	<ErrorBox error={$state.saveError}/>
	</div>
	<div class="card-footer d-flex justify-content-end">
		{#if $state.success}
			<span class="text-success">Saved successfully!</span>
		{/if}
		<button class="btn btn-primary" disabled={!enableSave}>
			{#if $state.saving}
			<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
			Saving...
			{:else}
			Save
			{/if}
		</button>
	</div>
</div>