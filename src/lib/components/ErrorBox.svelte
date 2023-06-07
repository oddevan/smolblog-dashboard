<script lang="ts">
	import Icon from './Icon.svelte';

	export let error: Error | undefined = undefined;
	export let message = error
		? error?.message ?? 'The operation could not be completed.'
		: undefined;
</script>

{#if message}
	<div class="alert alert-danger" role="alert">
		<Icon icon="exclamation-triangle-fill" />
		{message}
	</div>
{/if}
