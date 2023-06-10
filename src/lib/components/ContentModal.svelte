<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import FormPart, { type FormPartState } from './FormFields/FormPart.svelte';
	import type { Content, ContentType } from '$lib/smolblog/types';
	import { ContentTypes } from '$lib/smolblog/formdefs';

	export let show = false;
	export let type: ContentType;
	export let content: Partial<Content> = {};

	let title: string;
	$: title = `${content.id ? 'Edit' : 'New'} ${type}`;
	let typeState: FormPartState = { payload: content.type, dirty: false, valid: true };
</script>

<Modal {title} bind:open={show} outsideclose class="-left-1 -mx-3 sm:mx-0 w-screen sm:w-full">
	<div class="inner-modal">
		<FormPart
			definition={ContentTypes[type]}
			bind:partState={typeState}
			fieldClass="mobile-modal-full"
		/>
	</div>
	<svelte:fragment slot="footer">
		<Button on:click={() => (show = false)} color="red">Cancel</Button>
		<span class="grow" />
		<Button color="alternative">Draft</Button>
		<Button on:click={() => alert('Handle "success"')}>Publish</Button>
	</svelte:fragment>
</Modal>

<style lang="postcss">
	.inner-modal :global(.mobile-modal-full) {
		@apply -mx-6 w-screen sm:mx-0 sm:w-full;
	}
</style>
