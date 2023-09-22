import { field, type Validator } from 'svelte-forms';
import type { Field } from 'svelte-forms/types';
import {
	required as makeRequiredValidator,
	url as makeUrlValidator
} from 'svelte-forms/validators';
import type { Writable } from 'svelte/store';

export interface FieldValidator {
	key: string;
	func: (val: unknown) => Promise<boolean>;
	message: string;
}

export interface FormField {
	name: string;
	label: string;
	type: 'text' | 'password' | 'url' | 'display' | 'switch' | 'hidden' | 'markdown';
	description?: string;
	required?: boolean;
	validators?: FieldValidator[];
}

export function makeValidators(def: FormField): Validator[] {
	const { type, required = false, validators = [] } = def;

	const retVal: Validator[] = validators.map((vDef) => {
		const { key, func } = vDef;
		return async (val: unknown) => ({ name: key, valid: await func(val) });
	});
	if (required) {
		retVal.push(makeRequiredValidator());
	}
	if (type === 'url') {
		retVal.push(makeUrlValidator());
	}

	return retVal;
}

export function makeDefaultController(
	def: FormField,
	value: unknown
): Writable<Field<unknown>> & { validate: () => void } {
	const { name } = def;
	const validators = makeValidators(def);

	return field(name, value, validators);
}

export function getErrorMessage(validatorNames: string[], def: FormField): string | undefined {
	if (!validatorNames || validatorNames.length < 1) {
		return undefined;
	}

	if (validatorNames.includes('required')) {
		return 'This field is required.';
	} else if (validatorNames.includes('url')) {
		return 'Please enter a valid URL.';
	}

	return (
		def.validators?.find((val) => validatorNames[0] === val.key)?.message ?? 'Value is invalid.'
	);
}

export function getValidationState(fieldState: Field<unknown>) {
	if (fieldState.invalid) {
		return 'invalid';
	} else if (fieldState.dirty && fieldState.valid) {
		return 'valid';
	} else {
		return undefined;
	}
}

export { default as Basic } from './Text.svelte';
// export { default as Markdown } from './Markdown.svelte';
