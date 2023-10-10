<script lang="ts">
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import { makeDefaultController, type FormField, type FieldController, type FormFieldProps } from './FormFields';
	import BaseField from './FormFields/BaseField.svelte';
	import { onMount } from 'svelte';
	import { Tumblr, Microblog } from './Icons';

	interface $$Props extends FormFieldProps {};

	export let definition: FormField;
	export let value: unknown = [];
	export let controller: FieldController<unknown> = makeDefaultController(definition, value);

	const { name } = definition;
	let groupVal: string[] = value as string[];

	$: $controller.value = groupVal;
</script>

<BaseField {definition} bind:value {controller}>
	<ListBox multiple>
		<ListBoxItem bind:group={groupVal} name={name} value="2c2ffba0-c7e6-4f56-927b-aac08ca5f525">
			<svelte:fragment slot="lead"><Tumblr size="small"/></svelte:fragment>
			paperairplanemob
		</ListBoxItem>
		<ListBoxItem bind:group={groupVal} name={name} value="3f7e0901-7909-4ac0-9904-2b6b394c9831">
			<svelte:fragment slot="lead"><Tumblr size="small"/></svelte:fragment>
			plotholefragments
		</ListBoxItem>
		<ListBoxItem bind:group={groupVal} name={name} value="79661c86-68fb-4bd7-bc38-1116729094ac">
			<svelte:fragment slot="lead"><Microblog size="small"/></svelte:fragment>
			oddevan.com
		</ListBoxItem>
	</ListBox>
</BaseField>