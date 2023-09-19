import { browser } from '$app/environment';
import type { Server, Site, SmolblogContext, User } from '$lib/smolblog/types';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';
import { localStorageStore } from "@skeletonlabs/skeleton";
import Smolblog from '$lib/smolblog';

export const ssr = false;

export const load: LayoutLoad = async () => {
	let context: SmolblogContext = { token: null };
	let allSites: Site[] = [];
	let user: User|null = null;
	let server: Server|null = null;

	if (browser) {
		const store = localStorageStore<{ token: string|null }>('smolContext', { token: null });
		context = get(store);
	}

	if (context.token) {
		const api = Smolblog(context);
		await Promise.all([
			api.user.sites().then(res => allSites = res),
			api.user.me().then(res => user = res),
			api.server.info().then(res => server = res),
		]);
	}

	return { context, server, allSites, user };
};