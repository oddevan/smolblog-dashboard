import Smolblog from '$lib/smolblog';
import type { PageLoad } from '../$types';

export const load = (async ({ parent, fetch }) => {
	const { context } = await parent();
	const api = Smolblog(context, fetch);

	const userConnections = await api.user.connections();

	return { userConnections };
}) satisfies PageLoad;
