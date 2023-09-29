import { smolFetch, type FetchFunction } from "..";
import type { Site, SmolblogContext, User, UserSetProfilePayload } from "../types";

export function getMyProfile(context: SmolblogContext, fetcher: FetchFunction) {
	return smolFetch({ endpoint: '/my/profile', token: context.token ?? undefined }, fetcher) as Promise<User>;
}

export function getMySites(context: SmolblogContext, fetcher: FetchFunction) {
	return (
		smolFetch({ endpoint: '/my/sites', token: context.token ?? undefined }, fetcher) as Promise<{
			sites: Site[];
		}>
	).then((obj) => obj.sites);
}

export function setMyProfile(context: SmolblogContext, fetcher: FetchFunction, payload: UserSetProfilePayload) {
	return smolFetch(
		{ endpoint: '/my/profile/update', token: context.token ?? undefined, verb: 'PUT', payload },
		fetcher
	) as Promise<Record<string, never>>;
}