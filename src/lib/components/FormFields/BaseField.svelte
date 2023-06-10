<script lang="ts" context="module">
	import { field, type Validator } from 'svelte-forms';
	import { required as makeRequiredValidator } from 'svelte-forms/validators';

	export interface FieldValidator {
		key: string,
		func: (val: any) => Promise<boolean>,
		message: string,
	};

	export interface FormField {
		name: string,
		label: string,
		type: 'text' | 'password' | 'display' | 'switch' | 'hidden' | 'markdown',
		description?: string,
		required?: boolean,
		validators?: FieldValidator[],
	}

	export function makeValidators(def: FormField): Validator[] {
		const { required = false, validators = [] } = def;

		const retVal: Validator[] = validators.map(vDef => {
			const { key, func } = vDef;
			return async (val: any) => ({ name: key, valid: await func(val) });
		});
		if (required) {
			retVal.push(makeRequiredValidator());
		}

		return retVal;
	}

	export function makeDefaultController(
		def: FormField,
		value: any,
	): Writable<Field<any>> & { validate: () => void } {
		const { name } = def;
		const validators = makeValidators(def);

		return field(name, value, validators);
	}

	export function getErrorMessage(validatorNames: string[], def: FormField): string|undefined {
		if (!validatorNames) { return undefined; }

		if (validatorNames.includes('required')) {
			return 'This field is required.';
		} else {
			return validatorNames.map(
				name => def.validators?.find(val => name === val.key)?.message ?? 'Value is invalid.'
			).join(' ');
		}
	};
</script>

<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Field } from 'svelte-forms/types';
	import { onMount } from 'svelte';

	export let definition: FormField;
	export let controller: Writable<Field<any>> & { validate: () => void };

	let helpText: string | undefined = undefined;
	let color: 'red' | 'green' | undefined = undefined;

	onMount(() => controller.subscribe(fieldState => {
		helpText = getErrorMessage(fieldState.errors, definition) ?? definition.description;
		if (fieldState.invalid) {
			color = 'red';
		} else if (fieldState.dirty && fieldState.valid) {
			color = 'green';
		} else {
			color = undefined;
		}
	}));
</script>

<slot name="field" {helpText} {color} />
