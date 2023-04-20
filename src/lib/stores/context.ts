import Smolblog, { type SmolblogContext } from "$lib/smolblog";
import type { Site } from "$lib/smolblog/types";
import { writable } from "svelte/store";

const { subscribe, set, update } = writable<Smolblog>();
export default {
	subscribe,
	init(base: string) {
		set(new Smolblog({ apiBase: base }));
	},
	initWithContext(props: SmolblogContext) {
		set(new Smolblog(props));
	},
	setAuthHeader(header: string) {
		update(lib => new Smolblog({ ...lib.context, authHeader: header }));
	},
	setCurrentSite(site: Site) {
		update(lib => new Smolblog({ ...lib.context, currentSite: site }));
	},
	logout: () => {
		update(lib => new Smolblog({ apiBase: lib.apiBase }));
	}
}

export const demoContext: SmolblogContext = {
	apiBase: 'https://smolblog.localhost/wp-json/smolblog/v2',
	authHeader: 'Basic YWRtaW46c0FuRSBxaHhDIEVJejYgMjZWUyA5ZFdRIHMzQ20=',
};