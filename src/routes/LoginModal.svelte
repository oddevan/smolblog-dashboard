<script lang="ts">
	import { PUBLIC_API_BASE } from '$env/static/public';
	import ErrorBox from '$lib/components/ErrorBox.svelte';
	import SmolblogLogo from '$lib/components/SmolblogLogo.svelte';
	import Smolblog from '$lib/smolblog';
	import type { SmolblogStore } from '$lib/stores/context';
	import { getContext, onMount } from 'svelte';
	import { Button, Card, Checkbox, Input, Label } from 'flowbite-svelte';
	import { Text } from '$lib/components/FormFields';
	import { form as makeForm, field as makeField, type Validator } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';
	import type { FormField } from '$lib/components/FormFields/BaseField.svelte';
	import { error } from '@sveltejs/kit';

	const checkServer = async (apiBase: string) => {
		if (!apiBase) {
			return { valid: false, name: 'check_server' };
		}

		try {
			new URL(apiBase, window.location.href);
			await new Smolblog({ apiBase }).server.info();

			return { valid: true, name: 'check_server' };
		} catch (error) {
			console.error({ apiBase, error });
		}

		return { valid: false, name: 'check_server' };
	};

	const context = getContext<SmolblogStore>('smolblog');
	const serverFieldDef: FormField = {
		name: 'server',
		label: 'Server',
		type: 'text',
		description: 'URL of the Smolblog server to connect to.',
		required: true,
		errorMessageHandler: (errors: string[]) => {
			if (errors.includes('required')) {
				return 'Please enter a server to connect to.';
			} else {
				return 'Could not connect to server.';
			}
		}
	};
	const serverFieldController = makeField('server', '', [required(), checkServer]);

	onMount(async () => {
		$serverFieldController.value = $context?.apiBase ?? PUBLIC_API_BASE;
	});

	let uname: string;
	let pass: string;
	let loginError: Error;

	const saveToContext = async () => {
		try {
			if (!$serverFieldController.valid || !uname || !pass) {
				return;
			}

			const authHeader = `Basic ${btoa(`${uname}:${pass}`)}`;
			context.set({ apiBase: $serverFieldController.value, authHeader });
		} catch (error) {
			loginError = error as Error;
		}
	};
</script>

<Card shadow rounded class="place-self-center min-w-fit">
	<form class="flex flex-col space-y-6" action="/">
		<h1 class="text-center"><SmolblogLogo /></h1>
		<Text definition={serverFieldDef} controller={serverFieldController} />
		<hr />
	</form>
</Card>
