import type { PageLoad } from './$types';

export const load = (async () => {
	return { section: 'New Content' };
}) satisfies PageLoad;
