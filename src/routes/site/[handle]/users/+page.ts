import smolblog from "$lib/smolblog";
import type { PageLoad } from "./$types"

export const load = (async ({ parent, fetch }) => {
	const { context, site } = await parent();
	const api = smolblog(context, fetch).site(site?.id);
	
	if (!api) return { users: undefined };

	const users = await api.users();

	return { users };
}) satisfies PageLoad;