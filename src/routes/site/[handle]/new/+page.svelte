<script lang="ts">
	import ChannelSelectionField from "$lib/components/ChannelSelectionField.svelte";
	import type { FormField } from "$lib/components/FormFields";
	import type { FormPartState } from "$lib/components/Forms";
	import FormPart from "$lib/components/Forms/FormPart.svelte";
	import { Picture, Reblog, Status } from "$lib/components/Icons";
	import { ListBox, ListBoxItem, Tab, TabGroup } from "@skeletonlabs/skeleton";

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
				description: 'You can upload multiple pictures in most formats.',
				attributes: {
					multiple: true,
					accept: 'image/*',
				}
			},
			{
				name: 'caption',
				label: 'Caption',
				type: 'markdown',
				required: false,
			}
		]
	};

	const extensionDefinitions: Record<string, FormField[]> = {
		syndication: [
			{
				name: 'channels',
				label: 'Syndicate to',
				type: 'checkboxes',
				component: ChannelSelectionField,
			},
			{
				name: 'links',
				label: 'Links',
				type: 'multitext',
				attributes: {
					lowercase: true,
				},
				validators: [
					{
						key: 'allUrls',
						message: 'All links must be valid URLs.',
						func: async (val: unknown) => {
							const links = val as string[];
							return links.every(link => URL.canParse(link));
						},
					}
				]
			}
		],
		tags: [
			{
				name: 'tags',
				label: 'Tags',
				type: 'multitext',
				description: 'Press ENTER to save each tag',
				attributes: {
					duplicates: true,
				}
			}
		],
	};

	let formState: {type: FormPartState | undefined, extensions: Record<string, FormPartState>} = { type: undefined, extensions: {} };

	$: console.log(formState);
</script>

<div class="max-w-md -mx-4 sm:mx-0">
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
		<FormPart definition={typeDefinitions[currentTab]} bind:partState={formState.type} />
	</svelte:fragment>
</TabGroup>
{#each Object.keys(extensionDefinitions) as extDef }
	<hr>
	<h4 class="h4">{extDef}</h4>
	<FormPart definition={extensionDefinitions[extDef]} bind:partState={formState.extensions[extDef]} />
{/each}
</div>