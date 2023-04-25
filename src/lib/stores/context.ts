import { PUBLIC_API_BASE } from "$env/static/public";
import Smolblog, { type SmolblogContext } from "$lib/smolblog";
import type { Site } from "$lib/smolblog/types";
import { writable, type Readable } from "svelte/store";

export interface SmolblogStore extends Readable<Smolblog> {
	init: (base: string) => void,
	initWithContext: (props: SmolblogContext) => void,
	setAuthHeader: (header: string) => void,
	setCurrentSite: (site: Site) => void,
	logout: () => void,
};

const { subscribe, set, update } = writable<Smolblog>();
const store: SmolblogStore = {
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

export default store;

export const demoContext: SmolblogContext = {
	apiBase: PUBLIC_API_BASE,
	authHeader: 'Basic YWRtaW46c0FuRSBxaHhDIEVJejYgMjZWUyA5ZFdRIHMzQ20=',
};