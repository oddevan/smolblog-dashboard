import type { SiteSettingsPayload, SmolblogFetch, UserAndPermissions } from './types';

export function getSiteSettings(
	smolFetch: SmolblogFetch,
	siteId: string
): Promise<SiteSettingsPayload> {
	return smolFetch({ endpoint: `/site/${siteId}/settings` }) as Promise<SiteSettingsPayload>;
}

export async function setSiteSettings(
	smolFetch: SmolblogFetch,
	siteId: string,
	settings: SiteSettingsPayload
): Promise<boolean> {
	const { title, tagline } = settings;

	await smolFetch({
		endpoint: `/site/${siteId}/settings/set`,
		verb: 'PUT',
		payload: { title, tagline }
	});

	return true;
}

export async function getSiteUsers(
	smolFetch: SmolblogFetch,
	siteId: string
): Promise<UserAndPermissions[]> {
	const result = (await smolFetch({ endpoint: `/site/${siteId}/users` })) as {
		users: UserAndPermissions[];
	};
	return result.users;
}

export async function setSitePermission(
	smolFetch: SmolblogFetch,
	siteId: string,
	payload: { userId: string; isAuthor: boolean; isAdmin: boolean }
): Promise<boolean> {
	const { userId, isAuthor, isAdmin } = payload;

	await smolFetch({
		endpoint: `/site/${siteId}/users/set`,
		verb: 'PUT',
		payload: { userId, isAuthor, isAdmin }
	});

	return true;
}
