<script lang="ts">
	import type { FormField } from "$lib/components/FormFields";
	import FormPart from "$lib/components/Forms/FormPart.svelte";
import { Picture, Reblog, Status } from "$lib/components/Icons";
	import { Tab, TabGroup } from "@skeletonlabs/skeleton";

	let currentTab: string = 'note';

	const typeDefinitions: Record<string, FormField[]> = {
		note: [
			{
				name: 'text',
				label: 'What\'s going on?',
				type: 'markdown',
				required: true,
			}
		],
		reblog: [
			{
				name: 'url',
				label: 'Reblog this address',
				type: 'url',
				required: true,
			},
			{
				name: 'comment',
				label: 'Add to the conversation',
				type: 'markdown',
				required: false,
			}
		],
		picture: [
			{
				name: 'media',
				label: 'Upload a picture',
				type: 'file',
				required: true,
			},
			{
				name: 'caption',
				label: 'Caption',
				type: 'markdown',
				required: false,
			}
		]
	}
</script>

<div class="max-w-md -mx-2 sm:mx-0">
<TabGroup>
	<Tab bind:group={currentTab} name="tab1" value={'note'}>
		<span class="flex items-center">
			<Status class="me-2" size="small"/>
			<span>Note</span>
		</span>
	</Tab>
	<Tab bind:group={currentTab} name="tab2" value={'reblog'}>
		<span class="flex items-center">
			<Reblog class="me-2" size="small"/>
			<span>Reblog</span>
		</span>
	</Tab>
	<Tab bind:group={currentTab} name="tab3" value={'picture'}>
		<span class="flex items-center">
			<Picture class="me-2" size="small"/>
			<span>Picture</span>
		</span>
	</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		<FormPart definition={typeDefinitions[currentTab]} />
	</svelte:fragment>
</TabGroup>
</div>