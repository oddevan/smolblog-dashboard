import Smolblog from '$lib/smolblog';
import type { ConnectorConnection } from '$lib/smolblog/types';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { context } = await parent();
	let initialData: ConnectorConnection[] = [];

	if (context?.authHeader) {
		const api = new Smolblog(context, fetch);
		initialData = (await api.user?.connections.get()) ?? [];
	}

	return { title: 'Connections', initialData };
}) satisfies PageLoad;
