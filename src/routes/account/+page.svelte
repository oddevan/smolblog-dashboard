<script lang="ts">
	import type { FormField } from '$lib/components/FormFields';
	import type { FormPartState } from '$lib/components/Forms';
	import BasicForm from '$lib/components/Forms/BasicForm.svelte';
	import FormPart from '$lib/components/Forms/FormPart.svelte';
	import smolblog from '$lib/smolblog';
	import type { PageData } from './$types';

	export let data: PageData;

	const profileForm: FormField[] = [
		{
			name: 'displayName',
			label: 'Name',
			type: 'text',
			required: true
		},
		{
			name: 'handle',
			label: 'Handle',
			description: 'A unique name to represent your account.',
			type: 'text',
			required: true
		},
		{
			name: 'pronouns',
			label: 'Preferred pronouns',
			type: 'text'
		}
	];

	const submitFunc = smolblog(data.context, fetch).user.setProfile;
</script>

<h2 class="h2">Edit profile</h2>

<BasicForm definition={profileForm} initialData={data.userProfile} onSubmit={submitFunc} />

