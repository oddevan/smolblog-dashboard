<script lang="ts">
	import { Helper } from 'flowbite-svelte';

	export let helpText: string | undefined = undefined;
	export let color: 'red' | 'green' | undefined = undefined;

	const divClass = $$props.class ?? '';
</script>

{#if helpText}<Helper {color} class={divClass}>{helpText}</Helper>{/if}
