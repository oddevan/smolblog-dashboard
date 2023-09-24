import Smolblog from '$lib/smolblog';
import type { PageLoad } from '../$types';

export const load = (async ({ parent, fetch }) => {
	const { context } = await parent();
	const api = Smolblog(context, fetch);

	const userProfile = await api.user.me();

	return { userProfile };
}) satisfies PageLoad;
