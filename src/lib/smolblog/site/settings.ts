import type { SitePermissionPayload, SiteSettingsPayload, SmolblogContext, UserAndPermissions } from '../types';
import { smolFetch, type FetchFunction } from "..";

export function getSiteSettings(
	siteId: string,
	context: SmolblogContext,
	fetcher: FetchFunction,
): Promise<SiteSettingsPayload> {
	return smolFetch(
		{ endpoint: `/site/${siteId}/settings`, token: context.token ?? undefined },
		fetcher
	) as Promise<SiteSettingsPayload>;
}

export async function setSiteSettings(
	siteId: string,
	context: SmolblogContext,
	fetcher: FetchFunction,
	settings: SiteSettingsPayload
): Promise<void> {
	const { title, tagline } = settings;

	await smolFetch({
		endpoint: `/site/${siteId}/settings/set`,
		verb: 'PUT',
		payload: { title, tagline },
		token: context.token ?? undefined
	}, fetcher);
}

export async function getSiteUsers(
	siteId: string,
	context: SmolblogContext,
	fetcher: FetchFunction,
): Promise<UserAndPermissions[]> {
	const result = (await smolFetch(
		{ endpoint: `/site/${siteId}/users`, token: context.token ?? undefined },
		fetcher
	)) as { users: UserAndPermissions[] };
	return result.users;
}

export async function setSitePermission(
	siteId: string,
	context: SmolblogContext,
	fetcher: FetchFunction,
	payload: SitePermissionPayload,
): Promise<void> {
	const { userId, isAuthor, isAdmin } = payload;

	await smolFetch({
		endpoint: `/site/${siteId}/users/set`,
		verb: 'PUT',
		payload: { userId, isAuthor, isAdmin },
		token: context.token ?? undefined
	}, fetcher);
}