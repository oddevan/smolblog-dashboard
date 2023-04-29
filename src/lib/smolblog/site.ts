import type { SiteSettingsPayload, SmolblogFetch, UserAndPermissions } from "./types";

export function getSiteSettings(smolFetch: SmolblogFetch, siteId: string): Promise<SiteSettingsPayload> {
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
		payload: { title, tagline },
	});

	return true;
}

export async function getSiteUsers(smolFetch: SmolblogFetch, siteId: string): Promise<UserAndPermissions[]> {
	const result = await smolFetch({ endpoint: `/site/${siteId}/users` }) as { users: UserAndPermissions[] };
	return result.users;
}