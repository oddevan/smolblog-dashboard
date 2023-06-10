<script lang="ts">
  import { Button, Modal } from 'flowbite-svelte'
	import Markdown from './FormFields/Markdown.svelte';

  export let show = false;
</script>

<style lang="postcss">
	.inner-modal :global(.mobile-modal-full) {
		@apply -mx-6 w-screen sm:mx-0 sm:w-full;
	}
</style>

<Modal title="New Note" bind:open={show} outsideclose class="-left-1 -mx-3 sm:mx-0 w-screen sm:w-full">
	<div class="inner-modal">
		<Markdown class="mobile-modal-full" definition={{
			name: 'text',
			label: "What's happening?",
			type: 'markdown',
		}} />
	</div>
	<svelte:fragment slot='footer'>
		<Button on:click={() => show = false} color="red">Cancel</Button>
		<span class="grow"/>
		<Button color="alternative">Draft</Button>
		<Button on:click={() => alert('Handle "success"')}>Publish</Button>
	</svelte:fragment>
</Modal>