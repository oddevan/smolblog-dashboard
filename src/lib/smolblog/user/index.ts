import type { ConnectorConnection, SetUserProfilePayload, Site, SmolblogFetch, UserProfile } from "../types";

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

export async function getUserSites(smolFetch: SmolblogFetch): Promise<Site[]> {
	return [
		{id: 'afced1a4-9a3c-4f45-a1f1-f5ca27a50e07', displayName: 'Post Popular Mosts'},
		{id: '3f2772b2-e253-47d2-a428-28d96e6646eb', displayName: 'oddEvan.com'},
		{id: '5253c101-37e7-4e26-8d2b-ad6b021ddd80', displayName: 'madcrasher'},
		{id: 'd8988568-9a57-42d5-ad52-b13471c56092', displayName: 'The Nowhereverse'},
		{id: '19006999-3fbc-45bc-a7f9-b3a1ade834c0', displayName: 'PillTimer'},
	];
}

export async function getUserProfile(smolFetch: SmolblogFetch): Promise<UserProfile> {
	const response = await smolFetch({
		endpoint: '/my/profile',
	});

	return response as UserProfile;
}

export async function setUserProfile(smolFetch: SmolblogFetch, profile: SetUserProfilePayload): Promise<boolean> {
	if (!(profile.displayName || profile.handle || profile.pronouns)) {
		throw new Error(`No updated attribute provided.`);
	}

	await smolFetch({
		endpoint: '/my/profile/update',
		verb: 'POST',
		payload: JSON.stringify(profile),
	});

	return true;
}