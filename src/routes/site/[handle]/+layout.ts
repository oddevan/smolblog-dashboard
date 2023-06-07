import type { Site } from '$lib/smolblog/types';
import type { LayoutLoad } from './$types';

export const load = (async ({ parent, params }) => {
	const { breadcrumbs, userSites } = await parent();

	let currentSite: Site | undefined;

	if (userSites) {
		// const api = new Smolblog(context, fetch);
		currentSite = userSites?.find((site) => site.handle == params.handle);
	}

	return {
		currentSite,
		breadcrumbs: [
			...breadcrumbs,
			{ path: `/site/${currentSite?.handle}`, title: currentSite?.displayName }
		],
		subnav: []
	};
}) satisfies LayoutLoad;
