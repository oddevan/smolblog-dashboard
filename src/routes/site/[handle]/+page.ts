import type { PageLoad } from './$types';

export const load = (() => {
	return { title: 'Dashboard' };
}) satisfies PageLoad;
