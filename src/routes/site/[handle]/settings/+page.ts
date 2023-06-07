import Smolblog from '$lib/smolblog';
import type { SiteSettingsPayload } from '$lib/smolblog/types';
import type { PageLoad } from './$types';

export const load = (async ({ parent, fetch }) => {
	const { context, currentSite } = await parent();
	let initialData: SiteSettingsPayload | undefined;

	if (context?.authHeader && currentSite) {
		const api = new Smolblog(context, fetch);
		initialData = await api.site(currentSite.id).settings.general.get();
	}

	return { title: 'General', initialData };
}) satisfies PageLoad;
