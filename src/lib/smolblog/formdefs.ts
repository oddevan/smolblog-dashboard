import type { FormField } from '$lib/components/FormFields/BaseField.svelte';

export const ContentTypes: { [x: string]: FormField[] } = {
	Status: [
		{
			name: 'text',
			label: "What's happening?",
			type: 'markdown',
			required: true
		}
	],
	Reblog: [
		{
			name: 'url',
			label: 'URL',
			description: 'Address of the content being reblogged.',
			type: 'url',
			required: true
		},
		{
			name: 'comment',
			label: 'Add a comment',
			type: 'markdown',
			required: false
		}
	]
};
