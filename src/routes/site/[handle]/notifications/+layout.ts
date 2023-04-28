import type { LayoutLoad } from "./$types";

export const load = (async ({ parent }) => {
	const parentData = await parent();

	return {
		breadcrumbs: [
			...parentData.breadcrumbs,
			{ path: '/notifications', title: 'Notifications' }
		]
	}
}) satisfies LayoutLoad;