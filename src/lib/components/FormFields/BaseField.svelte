<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Field } from 'svelte-forms/types';
	import { onMount } from 'svelte';
	import { getErrorMessage, type FormField } from '.';

	export let definition: FormField;
	export let controller: Writable<Field<any>> & { validate: () => void };

	let helpText: string | undefined = undefined;
	let color: 'red' | 'green' | undefined = undefined;

	onMount(() =>
		controller.subscribe((fieldState) => {
			helpText = getErrorMessage(fieldState.errors, definition) ?? definition.description;
			if (fieldState.invalid) {
				color = 'red';
			} else if (fieldState.dirty && fieldState.valid) {
				color = 'green';
			} else {
				color = undefined;
			}
		})
	);
</script>

<slot name="field" {helpText} {color} />
