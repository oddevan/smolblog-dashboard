<script lang="ts">
	export let required: boolean = false;
</script>

<label class="label" {...$$restProps}>
	{#if required}<span class="text-red-500 dark:text-red-600">*</span> {/if}
	<slot />
</label>
