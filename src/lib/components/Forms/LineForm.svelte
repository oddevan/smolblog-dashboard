<script lang="ts">
	import type { Readable, Writable } from "svelte/store";
	import type { FormField, FormState } from "./Form.svelte";
	import type { Field } from "svelte-forms/types";
	import SwitchField from "./Fields/SwitchField.svelte";
	import Icon from "../Icon.svelte";

	export let state: Readable<FormState>;
	export let definition: FormField[];
	export let formController: Readable<{ dirty: boolean }> & {
		getField: (name: string) => Writable<Field<any>> & { validate: () => void }
	};

	let enableSave: boolean;
	$: enableSave = !$state.saving && $formController.dirty;
</script>

<div class="row">
	{#each definition as field (field.name)}
		{#if field.type === 'switch'}
			<SwitchField definition={field} controller={formController.getField(field.name)} />
		{/if}
	{/each}
	<div class="col-4 text-end">
		{#if $state.success}
			<span class="text-success">
				<Icon icon="check-circle"/>
			</span>
		{/if}
		<button class="btn btn-sm btn-outline-primary" disabled={!enableSave}>
			{#if $state.saving}
			<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
			Saving...
			{:else}
			Save
			{/if}
		</button>
	</div>
</div>