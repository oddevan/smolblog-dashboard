import { smolFetch, type FetchFunction } from '.';
import type { Site, SmolblogContext, SmolblogUserApiClient, User, UserSetProfilePayload } from './types';

export default function smolblogUser(context: SmolblogContext, fetcher: FetchFunction): SmolblogUserApiClient {
	return {
		me: () =>
			smolFetch({ endpoint: '/my/profile', token: context.token ?? undefined }, fetcher) as Promise<User>,
		sites: () =>
			(
				smolFetch({ endpoint: '/my/sites', token: context.token ?? undefined }, fetcher) as Promise<{
					sites: Site[];
				}>
			).then((obj) => obj.sites),
		setProfile: (payload: UserSetProfilePayload) =>
			smolFetch(
				{ endpoint: '/my/profile/update', token: context.token ?? undefined, verb: 'PUT', payload },
				fetcher
			) as Promise<Record<string, never>>
	};
}
