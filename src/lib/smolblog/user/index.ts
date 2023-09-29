import type { FetchFunction } from '..';
import type { SmolblogContext, SmolblogUserApiClient, UserSetProfilePayload } from '../types';
import { getMyConnections, startConnectionSession } from './connections';
import { getMyProfile, getMySites, setMyProfile } from './profile';

export default function smolblogUser(context: SmolblogContext, fetcher: FetchFunction): SmolblogUserApiClient {
	return {
		me: () => getMyProfile(context, fetcher),
		sites: () => getMySites(context, fetcher),
		setProfile: (payload: UserSetProfilePayload) => setMyProfile(context, fetcher, payload),
		connections: () => getMyConnections(context, fetcher),
		initConnection: (provider: string, returnTo: string) => startConnectionSession(context, fetcher, provider, returnTo),
	};
}
