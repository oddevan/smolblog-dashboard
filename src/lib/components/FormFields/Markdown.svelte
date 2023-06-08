<script lang="ts">
	import BaseField, { makeDefaultController, type FormField } from './BaseField.svelte';
	import type { Writable } from 'svelte/store';
	import type { Field } from 'svelte-forms/types';
	import BaseHelper from './BaseHelper.svelte';
	import { Markdown as MarkdownIcon } from '../Icons';
	import { createTextareaAutosize } from '@grail-ui/svelte/textareaAutosize';
	import { Spinner, Textarea } from 'flowbite-svelte';

	export let definition: FormField;
	export let controller: Writable<Field<any>> & { validate: () => void } =
		makeDefaultController(definition);
	export let value: any = undefined;

	const { name, label, required } = definition;
	$: value = $controller.value;
</script>

<BaseField {definition} {controller}>
	<div slot="field" let:helpText let:color>
		<Textarea
			{name}
			id="input-{name}"
			aria-label={label}
			rows={3}
			placeholder={label}
			bind:value={$controller.value}
		/>
		<MarkdownIcon />
		<BaseHelper {helpText} {color} />
	</div>
</BaseField>