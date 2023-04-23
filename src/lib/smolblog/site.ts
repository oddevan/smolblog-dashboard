import type { SiteSettingsPayload, SmolblogFetch } from "./types";

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