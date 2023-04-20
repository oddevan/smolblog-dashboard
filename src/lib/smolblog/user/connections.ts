import type { ConnectorConnection, SmolblogFetch } from "../types";

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