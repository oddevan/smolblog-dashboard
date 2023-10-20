import smolblog from "$lib/smolblog";
import type { PageLoad } from "./$types"

export const load = (async ({ parent, fetch }) => {
	const { context, site } = await parent();
	const api = smolblog(context, fetch).site(site?.id);
	
	if (!api) return { settings: undefined };

	const settings = await api.settings.get();

	return { settings };
}) satisfies PageLoad;