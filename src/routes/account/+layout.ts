import type { LayoutLoad } from './$types';

export const load = (() => {
	return { section: 'My Account' };
}) satisfies LayoutLoad;
