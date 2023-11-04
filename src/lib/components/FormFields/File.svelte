<script lang="ts">
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { makeDefaultController, type FormField, type FieldController, type FormFieldProps } from '.';
	import BaseField from './BaseField.svelte';
	import { Upload } from '../Icons';
	import { onMount } from 'svelte';

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
		accept={definition.attributes?.accept ?? undefined}
		multiple={definition.attributes?.multiple ?? undefined}
	>
		<svelte:fragment slot="lead"><Upload size="large" class="mx-auto"/></svelte:fragment>
		<svelte:fragment slot="meta">{helpText ?? ''}</svelte:fragment>
	</FileDropzone>
	{#each $fileController.value ?? [] as fileNote}
		<span class="chip variant-filled me-1">{fileNote.name}</span>
	{/each}
</BaseField>