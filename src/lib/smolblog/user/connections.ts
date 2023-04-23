import type { ConnectorChannelPlusLink, ConnectorConnection, SmolblogFetch } from "../types";

export async function startConnectionSession(smolFetch: SmolblogFetch, provider: string): Promise<string> {
	const response = await smolFetch({
		endpoint: `/connect/init/${provider}?returnTo=http://localhost:5174/account/connections`
	}) as { url: string };

	return response.url;
}

export async function getUserConnections(smolFetch: SmolblogFetch): Promise<ConnectorConnection[]> {
	const response = await smolFetch({ endpoint: '/my/connections' }) as { connections: ConnectorConnection[] };

	return response.connections;
}

export async function linkChannelAndSite(
	smolFetch: SmolblogFetch,
	siteId: string,
	channelId: string,
	push: boolean,
	pull: boolean
): Promise<boolean> {
	await smolFetch({
		endpoint: `/connect/link`,
		verb: 'PUT',
		payload: { siteId, channelId, push, pull },
	});

	return true;
}

export async function getSiteChannelsForAdmin(
	smolFetch: SmolblogFetch,
	siteId: string
): Promise<ConnectorChannelPlusLink[]> {
	const res = await smolFetch({ endpoint: `/site/${siteId}/channels` }) as { channels: ConnectorChannelPlusLink[] };
	return res.channels;
}