<script lang="ts">
	import BaseField, { makeDefaultController, type FormField } from './BaseField.svelte';
	import type { Writable } from 'svelte/store';
	import type { Field } from 'svelte-forms/types';
	import BaseHelper from './BaseHelper.svelte';
	import { Markdown as MarkdownIcon } from '../Icons';
	import { createTextareaAutosize } from '@grail-ui/svelte/textareaAutosize';
	import { Spinner, Textarea } from 'flowbite-svelte';

	export let definition: FormField;
	export let value: string | undefined = undefined;
	export let controller: Writable<Field<string>> & { validate: () => void } = makeDefaultController(
		definition,
		value
	);

	const { name, label } = definition;
	$: value = $controller.value;
</script>

<BaseField {definition} {controller}>
	<div class={$$props.class} slot="field" let:helpText let:color>
		<Textarea
			{name}
			{color}
			id="input-{name}"
			aria-label={label}
			rows={3}
			placeholder={label}
			bind:value={$controller.value}
			class="rounded-br-none"
		/>
		<div class="flex flex-row justify-end align-middle">
			<BaseHelper class="grow" {helpText} {color} />
			<span class="bg-gray-50 dark:bg-gray-600 p-2 rounded-b-lg">
				<MarkdownIcon class="fill-gray-600 dark:fill-gray-500 h-4" />
			</span>
		</div>
	</div>
</BaseField>
