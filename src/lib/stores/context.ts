import type { SmolblogContext } from '$lib/smolblog';
import { writable, type Readable } from 'svelte/store';

export interface SmolblogStore extends Readable<SmolblogContext> {
	init: (base: string) => void;
	set: (props: SmolblogContext) => void;
	setAuthHeader: (header: string) => void;
	setCurrentSite: (site: string) => void;
	logout: () => void;
}

const { subscribe, set, update } = writable<SmolblogContext>();
const store: SmolblogStore = {
	subscribe,
	set,
	init(base: string) {
		set({ apiBase: base });
	},
	setAuthHeader(header: string) {
		update((ctx) => ({ ...ctx, authHeader: header }));
	},
	setCurrentSite(site: string) {
		update((ctx) => ({ ...ctx, currentSiteId: site }));
	},
	logout: () => {
		update((ctx) => ({ apiBase: ctx.apiBase }));
	}
};

export default store;
