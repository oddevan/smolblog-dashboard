<script lang="ts">
	import { Helper } from "flowbite-svelte";

	export let helpText: string|undefined = undefined;
	export let color: 'red'|'green'|undefined = undefined;
</script>

{#if helpText}<Helper {color}>{helpText}</Helper>{/if}