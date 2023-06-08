<script lang="ts" context="module">
	import { field, type Validator } from 'svelte-forms';
	import { required as requiredValidator } from 'svelte-forms/validators';

	export interface FormField {
		name: string;
		label: string;
		type: 'text' | 'password' | 'display' | 'switch' | 'hidden' | 'markdown';
		description?: string;
		required?: boolean;
		errorMessageHandler?: (validatorNames: string[]) => string;
	}

	export function makeDefaultController(
		def: FormField
	): Writable<Field<any>> & { validate: () => void } {
		const { name, required } = def;
		const validators: Validator[] = [];

		if (required) {
			validators.push(requiredValidator());
		}

		return field(name, undefined, validators);
	}

	const defaultErrorMessageHandler = (validatorNames: string[]) => {
		if (validatorNames.includes('required')) {
			return 'This field is required.';
		} else {
			return 'Please enter a valid value.';
		}
	};
</script>

<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Field } from 'svelte-forms/types';

	export let definition: FormField;
	export let controller: Writable<Field<any>> & { validate: () => void };

	const errorMessageHandler = definition.errorMessageHandler ?? defaultErrorMessageHandler;

	let helpText: string | undefined = undefined;
	$: if ($controller.invalid) {
		helpText = errorMessageHandler($controller.errors);
	} else {
		helpText = definition.description ?? undefined;
	}

	let color: 'red' | 'green' | undefined = undefined;
	$: if ($controller.invalid) {
		color = 'red';
	} else if ($controller.dirty && $controller.valid) {
		color = 'green';
	} else {
		color = undefined;
	}
</script>

<slot name="field" {helpText} {color} />
