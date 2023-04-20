import type { SetUserProfilePayload, Site, SmolblogFetch, UserProfile } from "../types";

export async function getUserSites(smolFetch: SmolblogFetch): Promise<Site[]> {
	const response = await smolFetch({ endpoint: '/my/sites' }) as {sites: Site[]};

	return response.sites;
}

export async function getUserProfile(smolFetch: SmolblogFetch): Promise<UserProfile> {
	return await smolFetch({ endpoint: '/my/profile' }) as UserProfile;
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