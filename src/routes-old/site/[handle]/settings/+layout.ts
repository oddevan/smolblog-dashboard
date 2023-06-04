import type { LayoutLoad } from "./$types";

export const load = (async ({ parent }) => {
	const { breadcrumbs, currentSite } = await parent();

	return {
		breadcrumbs: [
			...breadcrumbs,
			{ path: `/site/${currentSite?.handle}/settings`, title: 'Settings' }
		]
	}
}) satisfies LayoutLoad;