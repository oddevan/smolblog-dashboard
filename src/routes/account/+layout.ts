import type { LayoutLoad } from "./$types";

export const load = (async ({ parent }) => {
	const { breadcrumbs } = await parent();

	return {
		breadcrumbs: [
			...breadcrumbs,
			{ path: '/account', title: 'My Account' }
		],
		subnav: [
			{ path: '/account', title: 'My Account' },
			{ path: '/account/connections', title: 'My Connections' }
		]
	}
}) satisfies LayoutLoad;