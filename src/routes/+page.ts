import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { allSites } = await parent();
	if (allSites?.length == 1) {
		throw redirect(302, `/site/${allSites[0].handle}`);
	}

	return { section: 'Dashboard' };
}) satisfies PageLoad;