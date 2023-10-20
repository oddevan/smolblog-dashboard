<script lang="ts">
	import { fade } from "svelte/transition";
	import type { FormPartState } from ".";
	import type { FormField } from "../FormFields";
	import FormPart from "./FormPart.svelte";

	export let definition: FormField[];
	export let initialData: Record<string, unknown> = {};
	export let onSubmit: (payload: Record<string, unknown>) => Promise<void> = async () => {};

	let partState: FormPartState;
	let errorMessage: string | null = null;
	let loading = false;
	let success = false;

	const submitFunc = () => {
		loading = true;
		onSubmit(partState.payload).
			then(res => {
				loading = false;
				success = true;
				setTimeout(() => success = false, 3000)
			}).
			catch(error => {
				errorMessage = error instanceof Error ? error.message : 'Something went wrong.';
				loading = false;
			});
	}
</script>

<div class="max-w-md">
	{#if errorMessage}
	<aside class="alert" transition:fade|local={{ duration: 200 }}>
		{errorMessage}
	</aside>
	{/if}
	<FormPart {definition} {initialData} bind:partState={partState} />
	<p class="text-end">
		{#if success}
		Saved
		{/if}
		<button type="button" on:click={submitFunc} disabled={!partState?.dirty} class="btn variant-filled-primary">Save</button>
	</p>
</div>