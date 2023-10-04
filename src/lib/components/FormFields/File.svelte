<script lang="ts">
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { makeDefaultController, type FormField, type FieldController, type FormFieldProps } from '.';
	import BaseField from './BaseField.svelte';
	import { Upload } from '../Icons';

	interface $$Props extends FormFieldProps {};

	export let definition: FormField;
	export let value: unknown = undefined;
	export let controller: FieldController<unknown> = makeDefaultController(definition, value);

	const { name, required } = definition;
	const fileController = controller as FieldController<FileList>
</script>

<BaseField {definition} bind:value {controller} let:helpText hideHelp>
	<FileDropzone
		{name}
		bind:files={$fileController.value}
		id="input-{name}"
		aria-describedby={helpText ? `description-${name}` : undefined}
		required={required ? true : false}
	>
		<svelte:fragment slot="lead"><Upload size="large"/></svelte:fragment>
		<svelte:fragment slot="message"><strong>Upload a file</strong> or drag-and-drop</svelte:fragment>
		<svelte:fragment slot="meta">{helpText}</svelte:fragment>
	</FileDropzone>
</BaseField>