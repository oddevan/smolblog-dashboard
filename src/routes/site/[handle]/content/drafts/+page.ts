import type { PageLoad } from './$types';

export const load = (() => {
	return { title: 'Drafts' };
}) satisfies PageLoad;
