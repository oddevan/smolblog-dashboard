import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { sites } = await parent();
	if (sites?.length == 1) {
		throw redirect(302, `/site/${sites[0].handle}`);
	}

	return { section: 'Dashboard' };
}) satisfies PageLoad;