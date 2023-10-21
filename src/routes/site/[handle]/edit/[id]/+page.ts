import smolblog from "$lib/smolblog";
import type { PageLoad } from "./$types"

export const load = (async ({ parent, fetch, params }) => {
	const { context, site } = await parent();
	const api = smolblog(context, fetch).site(site?.id);
	
	if (!api) return {};

	const content = api.content.get(params.id);

	return { section: 'Edit Content', content };
}) satisfies PageLoad;