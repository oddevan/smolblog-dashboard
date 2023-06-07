<script lang="ts">
	import { Alert } from 'flowbite-svelte';
	import { Alert as AlertIcon } from './Icons';

	export let error: Error | undefined = undefined;
	export let message = error
		? error?.message ?? 'The operation could not be completed.'
		: undefined;
</script>

{#if message}
	<Alert color="red">
		<AlertIcon slot="icon" />
		{message}
	</Alert>
{/if}
