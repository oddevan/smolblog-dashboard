<script lang="ts" context="module">
	import type { DrawerSettings } from "@skeletonlabs/skeleton";

	export const mediaDrawerOptions: DrawerSettings = {
		id: 'MediaForm',
		position: 'right',
		width: 'w-screen max-w-xs',
	};
</script>

<script lang="ts">
	import type { Media, SmolblogSiteApiClient } from "$lib/smolblog/types";
	import { FileDropzone, ProgressRadial } from "@skeletonlabs/skeleton";
	import BasicForm from "./Forms/BasicForm.svelte";
	import { Upload } from "./Icons";

	export let mediaId: string|null = null;
	export let siteApi: SmolblogSiteApiClient;

	async function loadInitialData(mediaId: string|null): Promise<Media|undefined> {
		if (!mediaId) return undefined;

		return await siteApi.media.get(mediaId);
	};

	function htmlForMedia(media: Media) {
		switch (media.type) {
			case 'audio':
				return `<audio src="${media.defaultUrl}"></audio>`;
			case 'file':
				return `<a class="btn variant-filled" href="${media.defaultUrl}">Download</a>`;
			case 'image':
				return `<img src="${media.defaultUrl}">`;
			case 'video':
				return `<video src="${media.defaultUrl}"></video>`;
		}
		return '';
	}
</script>

<div class="p-3">
	{#await loadInitialData(mediaId)}
		<ProgressRadial/>
	{:then initialData}
		{#if initialData}
			<div>
				{@html htmlForMedia(initialData)}
			</div>
		{:else}
			<FileDropzone name="fileUpload">
				<svelte:fragment slot="lead"><Upload size="large" class="mx-auto"/></svelte:fragment>
			</FileDropzone>
		{/if}
	{/await}
</div>