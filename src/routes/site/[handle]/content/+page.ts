import Smolblog from '$lib/smolblog';
import type { Content } from '$lib/smolblog/types';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { context, currentSite } = await parent();
	let initialData: Content[] = [];

	if (context?.authHeader && currentSite) {
		const api = new Smolblog(context, fetch);
		initialData = await api.site(currentSite.id).content.all() ?? [];
	}

	return { title: 'All Content', initialData };
}) satisfies PageLoad;
