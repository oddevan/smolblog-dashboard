<script lang="ts">
	import { SlideToggle } from "@skeletonlabs/skeleton";

	export let name: string;
	export let value: string|undefined = undefined;
	export let checked: boolean = false;
	export let group: string[]|undefined = undefined;

	$: if (value) {
		group = group?.filter(val => val != value).concat(checked ? [value] : []);
	}
</script>

<style lang="postcss">
	div :global(.slide-toggle-thumb) {
		background-size: 80%;
		background-position: center;
	}

	div :global(.toggle-off) :global(.slide-toggle-thumb) {
		background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" /></svg>');
	}

	div :global(.toggle-on) :global(.slide-toggle-thumb) {
		background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" /></svg>');
	}
</style>

<div>
	<SlideToggle
		class="p-2 my-1 block w-full bg-surface-100-800-token"
		bind:checked
		{name}
		background="toggle-off bg-surface-300-600-token"
		active="toggle-on bg-primary-200-700-token"
		{...$$restProps}
	>
		<slot/>
	</SlideToggle>
</div>