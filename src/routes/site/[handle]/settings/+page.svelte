<script lang="ts">
	import Form, { type FormField } from '$lib/components/Forms/Form.svelte';
	import Smolblog from '$lib/smolblog';
	import type { PageData } from './$types';

	const definition: FormField[] = [
		{
			name: 'id',
			label: 'Site ID',
			type: 'display'
		},
		{
			name: 'title',
			label: 'Title',
			type: 'text',
			required: true
		},
		{
			name: 'tagline',
			label: 'Tagline',
			type: 'text',
			description: 'Short (quippy?) description of the site.',
			required: true
		}
	];

	export let data: PageData;
	const { context, initialData, currentSite } = data;
	const api = context ? new Smolblog(context) : null;
</script>

<Form {definition} {initialData} setter={api?.site(currentSite?.id ?? '').settings.general.set} />
