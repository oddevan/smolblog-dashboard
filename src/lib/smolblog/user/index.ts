import { smolFetch, type FetchFunction } from '..';
import type { SmolblogContext, SmolblogUserApiClient, UserSetProfilePayload } from '../types';
import { deleteConnection, getMyConnections, refreshConnectionChannels, startConnectionSession } from './connections';
import { getMyProfile, getMySites, setMyProfile } from './profile';

export default function smolblogUser(context: SmolblogContext, fetcher: FetchFunction): SmolblogUserApiClient {
	return {
		me: () => getMyProfile(context, fetcher),
		sites: {
			list: () => getMySites(context, fetcher),
			new: (handle, displayName) => createSite(handle, displayName, context, fetcher),
		},
		setProfile: (payload: UserSetProfilePayload) => setMyProfile(context, fetcher, payload),
		connections: () => getMyConnections(context, fetcher),
		initConnection: (provider: string, returnTo: string) => startConnectionSession(context, fetcher, provider, returnTo),
		connection: (id: string) => ({
			refresh: () => refreshConnectionChannels(id, context, fetcher),
			delete: () => deleteConnection(id, context, fetcher),
		}),
	};
}

function createSite(
	handle: string,
	displayName: string,
	context: SmolblogContext,
	fetcher: FetchFunction
): Promise<string> {
	const fetchProps ={
		endpoint: '/site/new',
		token: context.token ?? undefined,
		verb: 'POST',
		payload: { handle, displayName }
	};

	return (smolFetch(fetchProps, fetcher) as Promise<{id: string}>).then(obj => obj.id);
}