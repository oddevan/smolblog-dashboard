import type { Site } from '$lib/smolblog/types';
import type { LayoutLoad } from './$types';

export const load = (async ({ parent, params }) => {
	const { allSites } = await parent();

	let site: Site|null = null;

	if (allSites) {
		// const api = new Smolblog(context, fetch);
		site = allSites?.find((s) => s.handle == params.handle);
	}

	return { site, section: 'Dashboard' };
}) satisfies LayoutLoad;