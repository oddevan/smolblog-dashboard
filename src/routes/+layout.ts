import type { LayoutLoad } from "./$types";

export const load = (() => {
	return {
		breadcrumbs: [{ path: '/', title: 'Dashboard' }],
		title: 'Dashboard',
	}
}) satisfies LayoutLoad;