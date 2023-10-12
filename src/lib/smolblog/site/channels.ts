import { smolFetch, type FetchFunction } from "..";
import type { ConnectorChannelPlusLink, SmolblogContext } from "../types";

export async function getSiteChannelsForAdmin(
	siteId: string,
	context: SmolblogContext,
	fetcher: FetchFunction
): Promise<ConnectorChannelPlusLink[]> {
	const res = (await smolFetch({
		endpoint: `/site/${siteId}/channels`,
		token: context.token ?? undefined
	}, fetcher)) as {
		channels: ConnectorChannelPlusLink[];
	};
	return res.channels;
}

export async function getSiteChannelsForForm(
	siteId: string,
	context: SmolblogContext,
	fetcher: FetchFunction
): Promise<ConnectorChannelPlusLink[]> {
	const all = await getSiteChannelsForAdmin(siteId, context, fetcher);
	return all.filter(cha => cha.canPush);
}

export async function linkChannelAndSite(
	channelId: string,
	push: boolean,
	pull: boolean,
	siteId: string,
	context: SmolblogContext,
	fetcher: FetchFunction
): Promise<void> {
	console.log({ siteId, channelId, push, pull });
	await smolFetch({
		endpoint: `/connect/link`,
		verb: 'POST',
		payload: { siteId, channelId, push, pull },
		token: context.token ?? undefined
	}, fetcher);
}