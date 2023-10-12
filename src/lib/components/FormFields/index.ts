import type { ComponentType, SvelteComponent } from 'svelte';
import { field, type Validator } from 'svelte-forms';
import type { Field } from 'svelte-forms/types';
import {
	email as makeEmailValidator,
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
	type: 'text' | 'password' | 'url' | 'email' | 'display' | 'switch' | 'hidden' | 'markdown' | 'file' | 'checkboxes' | 'multitext';
	description?: string;
	required?: boolean;
	validators?: FieldValidator[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	attributes?: Record<string, any>;
	component?: ComponentType<SvelteComponent<FormFieldProps>>;
}

export type FieldController<T> = Writable<Field<T>> & { validate: () => void };

export interface FormFieldProps {
	definition: FormField,
	value?: unknown,
	controller?: FieldController<unknown>,
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
	switch (type) {
		case 'url':
			retVal.push(makeUrlValidator());
			break;
		case 'email':
			retVal.push(makeEmailValidator());
			break;
	}

	return retVal;
}

export function makeDefaultController<T>(
	def: FormField,
	value: T
): FieldController<T> {
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

export { default as Display } from './Display.svelte';
export { default as Email } from './Email.svelte';
export { default as File } from './File.svelte';
export { default as Markdown } from './Markdown.svelte';
export { default as Multitext } from './Multitext.svelte';
export { default as Text } from './Text.svelte';
export { default as Url } from './Url.svelte';
