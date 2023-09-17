import { browser } from '$app/environment';
import type { Site, SmolblogContext, User } from '$lib/smolblog/types';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';
import { localStorageStore } from "@skeletonlabs/skeleton";
import Smolblog from '$lib/smolblog';

export const load: LayoutLoad = async () => {
	let context: SmolblogContext = { token: null };
	let sites: Site[] = [];
	let user: User|null = null;

	if (browser) {
		const store = localStorageStore<{ token: string|null }>('smolContext', { token: null });
		context = get(store);

		if (context.token) {
			const api = Smolblog(context);
			sites = await api.user.sites();
			user = await api.user.me();
		}
	}

	return { context, sites, user };
};