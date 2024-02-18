import type { LayoutLoad } from './$types';

export const load = (async () => {
	return { section: 'Create Site' };
}) satisfies LayoutLoad;
