import type { LayoutLoad } from "./$types";

export const load = (async ({ parent }) => {
	const { breadcrumbs, currentSite } = await parent();

	return {
		breadcrumbs: [
			...breadcrumbs,
			{ path: `/site/${currentSite?.handle}/settings`, title: 'Settings' }
		],
		subnav: [
			{ path: `/site/${currentSite?.handle}/settings`, title: 'General' },
			{ path: `/site/${currentSite?.handle}/settings/syndication`, title: 'Syndication' },
			{ path: `/site/${currentSite?.handle}/settings/data`, title: 'Data' },
		]
	}
}) satisfies LayoutLoad;