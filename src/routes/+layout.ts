import { browser } from "$app/environment";
import type { SmolblogContext } from "$lib/smolblog";
import Smolblog from "$lib/smolblog";
import type { Site, UserProfile } from "$lib/smolblog/types";
import type { LayoutLoad } from "./$types";

export const prerender = true;

export const load = (async ({ data, fetch }) => {
	const context: SmolblogContext|undefined = data?.context ?? await getLocalContext();
	let userProfile: UserProfile|undefined;
	let serverVersion: string|undefined;
	let userSites: Site[]|undefined;

	if (context) {
		const api = new Smolblog(context, fetch);
		try {
			serverVersion = (await api.server.info()).serverVersion;
			userProfile = await api.user?.profile.get();
			userSites = await api.user?.sites.get();
		} catch (e) {
			console.error(e);
		}
	}

	return {
		breadcrumbs: [{ path: '/', title: 'Home' }],
		title: 'Home',
		context,
		userProfile,
		serverVersion,
		userSites
	};
}) satisfies LayoutLoad;

async function getLocalContext(): Promise<SmolblogContext | undefined> {
	if (!browser) { return; }

	const { Vault } = await import('@ultimate/vault');
	const localStorage = new Vault({});
	const localContext = localStorage.get<SmolblogContext>('context');
	return localContext?.apiBase ? localContext : undefined;
}