import Smolblog from '$lib/smolblog';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { context, site } = await parent();
	const api = Smolblog(context, fetch);

	const channels = await api.site(site?.id)?.channels(true);

	return { section: 'Syndication Channels', channels };
}) satisfies PageLoad;
