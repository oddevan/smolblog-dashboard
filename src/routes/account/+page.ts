import Smolblog from '$lib/smolblog';
import type { UserProfile } from '$lib/smolblog/types';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { context } = await parent();
	let initialData: UserProfile | undefined;

	if (context?.authHeader) {
		const api = new Smolblog(context, fetch);
		initialData = await api.user?.profile.get();
	}

	return { title: 'Edit Profile', initialData };
}) satisfies PageLoad;
