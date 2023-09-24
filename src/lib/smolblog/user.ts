import { smolFetch, type FetchFunction } from '.';
import type { Site, SmolblogContext, SmolblogUserApiClient, User } from './types';

export default function smolblogUser(context: SmolblogContext, fetcher: FetchFunction): SmolblogUserApiClient {
	return {
		me: () =>
			smolFetch({ endpoint: '/my/profile', token: context.token ?? undefined }, fetcher) as Promise<User>,
		sites: () =>
			(
				smolFetch({ endpoint: '/my/sites', token: context.token ?? undefined }, fetcher) as Promise<{
					sites: Site[];
				}>
			).then((obj) => obj.sites)
	};
}
