<script lang="ts">
	import type { PageData } from "./$types";
	import smolblog from "$lib/smolblog";
	import BasicForm from "$lib/components/Forms/BasicForm.svelte";
	import type { FormField } from "$lib/components/FormFields";

	export let data: PageData;

	const api = smolblog(data.context);
	const submitFunc = api.site(data.site?.id)?.settings.set;
	console.log('hello');

	const definition: FormField[] = [
		{
			name: 'title',
			label: 'Title',
			type: 'text',
			required: true,
			description: 'Used as the profile name in some social apps.'
		},
		{
			name: 'tagline',
			label: 'Tagline',
			type: 'text',
			description: 'A short slogan.'
		},
	];
</script>

<h2 class="h2">Edit site</h2>

<BasicForm {definition} initialData={data.settings} onSubmit={submitFunc} />

