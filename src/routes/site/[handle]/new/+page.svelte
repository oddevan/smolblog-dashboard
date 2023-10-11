<script lang="ts">
	import ChannelSelectionField from "$lib/components/ChannelSelectionField.svelte";
	import type { FormField } from "$lib/components/FormFields";
	import type { FormPartState } from "$lib/components/Forms";
	import FormPart from "$lib/components/Forms/FormPart.svelte";
	import * as Icons from "$lib/components/Icons";
	import type { SiteConfigContent } from "$lib/smolblog/types";
	import { ListBox, ListBoxItem, ProgressBar, Tab, TabGroup } from "@skeletonlabs/skeleton";
	import { onMount, type ComponentType, SvelteComponent } from "svelte";
	import type { PageData } from "./$types";
	import Smolblog from "$lib/smolblog";
	import ContentIcon from "$lib/components/ContentIcon.svelte";

	export let data: PageData;

	let config: SiteConfigContent|undefined = undefined;

	let selectedType: string|null = null;
	let typeStates: Record<string, FormPartState> = {};
	let extensionStates: Record<string, FormPartState> = {};
	let payload: Record<string, any>;

	function extractExtensionPayloads(extensions: Record<string, FormPartState>) {
		const retVal: Record<string, any> = {};

		Object.keys(extensions).forEach((extKey) => {
			retVal[extKey] = extensions[extKey].payload;
		});

		return retVal;
	}

	onMount(async () => {
		config = await Smolblog(data.context).site(data.site?.id ?? '').config.content();
	});

	$: payload = selectedType ? {
		type: { type: selectedType, ...typeStates[selectedType]?.payload},
		meta: {},
		extensions: extractExtensionPayloads(extensionStates)
	} : {};
</script>

<div class="grid grid-cols-2">

<div class="max-w-md -mx-4 sm:mx-0">
{#if !config}
	<ProgressBar meter="bg-primary-900-50-token" track="bg-primary-200-700-token" />
{:else if !selectedType}
	<div class="logo-cloud grid-cols-3 gap-1">
		{#each Object.keys(config.types) as typeKey}
		<button class="logo-item" on:click={() => selectedType = typeKey}>
			<span>
				<ContentIcon type={typeKey} size="small"/>
			</span>
			<span>{config.types[typeKey].name}</span>
		</button>
		{/each}
	</div>
{:else}
	<div class="flex items-center justify-between">
		<h2 class="h2">New {config.types[selectedType].name}</h2>
		<button on:click={() => selectedType = null} class="btn-icon btn-sm variant-filled-error">
			<Icons.Cross size="medium" alt="Cancel"/>
		</button>
	</div>
	<FormPart definition={config.types[selectedType].formDefinition} bind:partState={typeStates[selectedType]} />
	{#each Object.keys(config.extensions) as extDef }
		<hr>
		<h4 class="h4">{config.extensions[extDef].name}</h4>
		<FormPart definition={config.extensions[extDef].formDefinition} bind:partState={extensionStates[extDef]} />
	{/each}
{/if}
</div>

<div>
	<h2 class="h2">Payload</h2>
	<pre class="pre">
{JSON.stringify(payload, null, "  ")}
	</pre>
</div>
</div>