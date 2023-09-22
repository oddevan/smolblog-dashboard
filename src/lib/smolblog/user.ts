import { smolFetch } from '.';
import type { Site, SmolblogContext, SmolblogUserApiClient, User } from './types';

export default function smolblogUser(context: SmolblogContext): SmolblogUserApiClient {
	return {
		me: () =>
			smolFetch({ endpoint: '/my/profile', token: context.token ?? undefined }) as Promise<User>,
		sites: () =>
			(
				smolFetch({ endpoint: '/my/sites', token: context.token ?? undefined }) as Promise<{
					sites: Site[];
				}>
			).then((obj) => obj.sites)
	};
}
