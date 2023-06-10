<script lang="ts">
	import Smolblog from '$lib/smolblog';
	import { Button } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import ContentModal from '$lib/components/ContentModal.svelte';
	import type { ContentType } from '$lib/smolblog/types';

	export let data: PageData;
	const api = data.context && data.currentSite ? new Smolblog(data.context) : undefined;

	let showContentModal = false;
	let contentModalType: ContentType;

	const launchModal = (type: ContentType) => {
		contentModalType = type;
		showContentModal = true;
	};
</script>

<Button on:click={() => launchModal('Status')}>New Status</Button>
<Button on:click={() => launchModal('Reblog')}>New Reblog</Button>

<ContentModal bind:show={showContentModal} type={contentModalType} />
