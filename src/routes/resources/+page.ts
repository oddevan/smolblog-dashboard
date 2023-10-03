import type { PageLoad } from './$types';

export const load = (async () => {
	return { section: 'Design Resources' };
}) satisfies PageLoad;
