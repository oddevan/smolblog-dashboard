<script lang="ts">
	import type { FormField } from "$lib/components/FormFields";
	import type { FormPartState } from "$lib/components/Forms";
	import FormPart from "$lib/components/Forms/FormPart.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	const profileForm: FormField[] = [
		{
			name: 'displayName',
			label: 'Name',
			type: 'text',
			required: true,
		},
		{
			name: 'handle',
			label: 'Handle',
			description: 'A unique name to represent your account.',
			type: 'text',
			required: true,
		},
		{
			name: 'email',
			label: 'Email',
			type: 'display',
		},
	];

	let profileState: FormPartState;
	$: console.log({profileState});
</script>

<h2 class="h2">Edit profile</h2>

<FormPart definition={profileForm} initialData={data.userProfile} bind:partState={profileState} />
