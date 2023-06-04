<script lang="ts">
	import { Label } from "flowbite-svelte";

	export let color: 'red'|'green'|undefined;
	export let required: boolean = false;
</script>

<Label {color} for="input-{name}">
	{#if required}<span class="text-red-500 dark:text-red-600">*</span> {/if}
	<slot/>
</Label>