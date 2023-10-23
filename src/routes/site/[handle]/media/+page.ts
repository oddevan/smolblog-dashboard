import smolblog from "$lib/smolblog";
import type { PageLoad } from "./$types"

export const load = (async ({ parent, fetch }) => {
	const { context, site } = await parent();
	const api = smolblog(context, fetch).site(site?.id);
	
	if (!api) return {content: []};

	const contentResult = await api.media.list();

	return { media: contentResult.content, mediaCount: contentResult.count };
}) satisfies PageLoad;