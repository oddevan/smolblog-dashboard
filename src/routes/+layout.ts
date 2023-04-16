import type { LayoutLoad } from "./$types";

export const prerender = true;

export const load = (() => {
	return {
		breadcrumbs: [{ path: '/', title: 'Dashboard' }],
		title: 'Dashboard',
	}
}) satisfies LayoutLoad;