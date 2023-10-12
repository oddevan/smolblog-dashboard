/* eslint-disable @typescript-eslint/no-unused-vars */
import ChannelSelectionField from "$lib/components/ChannelSelectionField.svelte";
import type { FetchFunction } from "..";
import type { SiteConfigContent, SmolblogContext, SmolblogSiteApiClient } from "../types";
import { getSiteChannelsForAdmin, getSiteChannelsForForm, linkChannelAndSite } from "./channels";

export default function smolblogSite(id: string, context: SmolblogContext, fetcher: FetchFunction): SmolblogSiteApiClient {
	return {
		setChannel: (channelId: string, push: boolean, pull: boolean) => linkChannelAndSite(channelId, push, pull, id, context, fetcher),
		channels: (admin: boolean = false) => admin ? getSiteChannelsForAdmin(id, context, fetcher) : getSiteChannelsForForm(id, context, fetch),
		config: {
			content: async () => defaultContentConfig
		}
	}
}

const defaultContentConfig: SiteConfigContent = {
	types: {
		note: {
			key: 'note',
			name: 'Note',
			formDefinition: [
				{
					name: 'text',
					label: 'What\'s going on?',
					type: 'markdown',
					required: true,
				}
			]
		},
		reblog: {
			key: 'reblog',
			name: 'Reblog',
			formDefinition: [
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
		},
		picture: {
			key: 'picture',
			name: 'Picture',
			formDefinition: [
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
		}
	},
	extensions: {
		syndication: {
			key: 'syndication',
			name: 'Syndication',
				formDefinition: [
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
		},
		tags: {
			key: 'tags',
			name: 'Tags',
			formDefinition: [
				{
					name: 'tags',
					label: 'Tags',
					type: 'multitext',
					attributes: {
						duplicates: true,
					}
				}
			]
		}
	}
};