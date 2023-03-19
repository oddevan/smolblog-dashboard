import type { ConnectorConnection, SmolblogFetch } from "../types";

export async function getUserConnections(smolFetch: SmolblogFetch): Promise<ConnectorConnection[]> {
	const dummies = [
		{provider: 'twitter', displayName: '@oddevan', channels: ['@oddevan']},
		{provider: 'twitter', displayName: '@_smolblog', channels: ['@_smolblog']},
		{provider: 'mastodon', displayName: '@oddevan@mastodon.social', channels: ['@oddevan@mastodon.social']},
		{provider: 'youtube', displayName: 'Evan Hildreth', channels: ['Evan Hildreth','madcrasher']},
		{provider: 'facebook', displayName: 'Evan Hildreth', channels: ['PillTimer','madcrasher']},
	];

	return dummies.map(mock => {
		return {
			id: crypto.randomUUID(),
			userId: 'c5889f4e-dc94-4ab5-b38a-0be488f93f0c',
			provider: mock.provider,
			providerKey: `${mock.provider}|${mock.displayName}`,
			displayName: mock.displayName,
			channels: mock.channels.map(cha => {
				return {
					id: crypto.randomUUID(),
					channelKey: cha,
					displayName: cha,
				};
			}),
		}
	});
}