<script lang="ts">
	import Smolblog from '$lib/smolblog';
	import { Button } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import ContentModal from '$lib/components/ContentModal.svelte';

	export let data: PageData;
	const api = data.context && data.currentSite ? new Smolblog(data.context) : undefined;

	let showContentModal = false;
</script>

<Button on:click={() => (showContentModal = true)}>New Note</Button>

<ContentModal bind:show={showContentModal} />
