import { smolFetch, type FetchFunction } from "..";
import type { ConnectorConnection, SmolblogContext } from "../types";

export function startConnectionSession(
	context: SmolblogContext, fetcher: FetchFunction,
	provider: string, returnTo: string,
) {
	return (smolFetch({
		endpoint: `/connect/init/${provider}?returnTo=${returnTo}`,
		token: context.token ?? undefined
	}, fetcher) as Promise<{ url: string }>).then(res => res.url);
}

export async function getMyConnections(context: SmolblogContext, fetcher: FetchFunction,) {
	return (smolFetch({ endpoint: '/my/connections', token: context.token ?? undefined }, fetcher) as Promise<{
		connections: ConnectorConnection[];
	}>).then(res => res.connections);
}

export async function refreshConnectionChannels(connectionId: string, context: SmolblogContext, fetcher: FetchFunction,) {
	return smolFetch({ endpoint: `/connect/connection/${connectionId}/refresh`, token: context.token ?? undefined, verb: 'POST' }, fetcher) as Promise<ConnectorConnection>;
}

export async function deleteConnection(connectionId: string, context: SmolblogContext, fetcher: FetchFunction,) {
	return smolFetch({ endpoint: `/connect/connection/${connectionId}/delete`, token: context.token ?? undefined, verb: 'DELETE' }, fetcher) as Promise<void>;
}
