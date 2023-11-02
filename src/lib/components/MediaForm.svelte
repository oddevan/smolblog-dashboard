<script lang="ts" context="module">
	import type { DrawerSettings } from "@skeletonlabs/skeleton";
	import type { FormField } from "./FormFields";

	export const mediaDrawerOptions: DrawerSettings = {
		id: 'MediaForm',
		position: 'right',
		width: 'w-screen max-w-xs',
	};

	const fileDefinition: FormField = {
		name: 'media',
		label: 'Upload a picture',
		type: 'file',
		required: true,
		description: 'You can upload a picture in most formats.',
		attributes: {
			multiple: false,
			accept: 'image/*',
		}
	}

	const mediaFormDefinition: FormField[] = [
		{
			name: 'id',
			label: 'ID',
			type: 'hidden',
		},
		{
			name: 'title',
			label: 'Title',
			type: 'text',
			required: true,
		},
		{
			name: 'accessibilityText',
			label: 'Accessibility Text (Alt)',
			type: 'text',
			required: true,
		},
	]
</script>

<script lang="ts">
	import type { Media, SmolblogSiteApiClient } from "$lib/smolblog/types";
	import { FileDropzone, ProgressRadial } from "@skeletonlabs/skeleton";
	import BasicForm from "./Forms/BasicForm.svelte";
	import { Upload } from "./Icons";
	import { File } from "./FormFields";

	export let mediaId: string|null = null;
	export let siteApi: SmolblogSiteApiClient;

	let uploadedFiles: FileList;

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

	async function save(formPayload: Record<string, unknown>) {
		if (!formPayload.title || !formPayload.accessibilityText) {
			throw new Error('Title and Alt Text are required.');
		}

		const { title, accessibilityText } = formPayload;

		if (formPayload.id) {
			console.log('edit', formPayload);
			return;
		}

		if (!uploadedFiles || uploadedFiles.length < 1) {
			throw new Error('Please provide a file to upload.');
		}

		const payload = new FormData();
		payload.append('title', title as string);
		payload.append('accessibilityText', accessibilityText as string);
		payload.append('file', uploadedFiles[0]);

		console.log({uploadedFiles});
	}
</script>

<div class="p-3">
	{#await loadInitialData(mediaId)}
		<ProgressRadial/>
	{:then media}
		{#if media}
			<div>
				{@html htmlForMedia(media)}
			</div>
		{:else}
			<File definition={fileDefinition} bind:value={uploadedFiles} />
		{/if}
		<BasicForm
			definition={mediaFormDefinition}
			initialData={media ? {id: media.id, title: media.title, accessabilityText: media.accessibilityText} : undefined}
			onSubmit={save}
		/>
	{/await}
</div>