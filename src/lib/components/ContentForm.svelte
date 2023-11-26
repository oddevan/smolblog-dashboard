<script lang="ts" context="module">
	import type { DrawerSettings } from "@skeletonlabs/skeleton";

	export const contentDrawerOptions: DrawerSettings = {
		id: 'ContentForm',
		position: 'right',
		width: 'w-screen max-w-xs',
	};
</script>

<script lang="ts">
	import type { FormPartState } from "$lib/components/Forms";
	import FormPart from "$lib/components/Forms/FormPart.svelte";
	import { Cross } from "$lib/components/Icons";
	import { ProgressBar } from "@skeletonlabs/skeleton";
	import ContentIcon from "$lib/components/ContentIcon.svelte";
	import { page } from "$app/stores";
	import type { ContentPayload, SiteConfigContent, SmolblogSiteApiClient } from "$lib/smolblog/types";

	export let contentId: string|null = null;
	export let siteApi: SmolblogSiteApiClient;

	let selectedType: string|null = null;
	let typeStates: Record<string, FormPartState> = {};
	let extensionStates: Record<string, FormPartState> = {};
	let metaState: FormPartState = { payload: {}, dirty: false, valid: true };
	let payload: Record<string, any>;

	async function loadInitialData(contentId: string|null): Promise<{
		config: SiteConfigContent,
		content?: ContentPayload
	}> {
		const [config, content] = await Promise.all([
			siteApi.config.content(),
			contentId ? siteApi.content.get(contentId) : undefined,
		])

		config.types.picture.formDefinition[0].attributes ??= {};
		config.types.picture.formDefinition[0].attributes.siteApi = siteApi;

		if (content?.type.type == 'picture' && content.type.hasOwnProperty('media') && Array.isArray(content.type.media)) {
			content.type.media = content.type.media.map(mediaObj => mediaObj.id);
		}
		
		return { config, content };
	};

	function extractExtensionPayloads(extensions: Record<string, FormPartState>) {
		const retVal: Record<string, any> = {};

		Object.keys(extensions).forEach((extKey) => {
			retVal[extKey] = extensions[extKey].payload;
		});

		return retVal;
	}

	const saveForm = async (type: string) => {
		console.log({
			id: contentId,
			type: { type, ...typeStates[type]?.payload},
			meta: metaState.payload,
			extensions: extractExtensionPayloads(extensionStates)
		})
	};
</script>

<div class="p-3">
	{#await loadInitialData(contentId)}
		<ProgressBar meter="bg-primary-900-50-token" track="bg-primary-200-700-token" />
	{:then initialData}
		{@const {config, content} = initialData}
		{#if !selectedType && !content}
			<div class="logo-cloud grid-cols-3 gap-1">
				{#each Object.keys(config.types ?? {}) as typeKey}
				<button class="logo-item" on:click={() => selectedType = typeKey}>
					<span>
						<ContentIcon type={typeKey} size="small"/>
					</span>
					<span>{config.types[typeKey].name}</span>
				</button>
				{/each}
			</div>
		{:else}
			{@const type = content?.type.type ?? selectedType ?? 'note'}
			<div class="flex items-center justify-between">
				<h2 class="h2">
					{content ? 'Edit' : 'New'} 
					{config.types[type].name}
				</h2>
				{#if !content}
					<button on:click={() => selectedType = null} class="btn-icon btn-sm variant-filled-error">
						<Cross size="medium" alt="Cancel"/>
					</button>
				{/if}
			</div>
			<FormPart definition={config.types[type].formDefinition} bind:partState={typeStates[type]} initialData={{...content?.type}} />
			<hr class="my-3">
			<FormPart definition={config.base} bind:partState={metaState} initialData={{authorId: $page.data.user?.id, published: content?.published, ...content?.meta}} />
			{#each Object.keys(config.extensions) as extDef }
				<hr class="my-3">
				<h4 class="h4">{config.extensions[extDef].name}</h4>
				<FormPart definition={config.extensions[extDef].formDefinition} bind:partState={extensionStates[extDef]} initialData={content?.extensions[extDef]} />
			{/each}

			<button class="btn variant-filled-primary" on:click={() => saveForm(type)}>
				Save
			</button>
		{/if}
	{/await}
</div>