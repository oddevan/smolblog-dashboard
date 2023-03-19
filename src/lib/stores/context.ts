import Smolblog from "$lib/smolblog";
import { writable } from "svelte/store";

const { subscribe, set, update } = writable<Smolblog>();
export default {
	subscribe,
	init(base: string) {
		set(new Smolblog(base));
	},
	setAuthHeader(header: string) {
		update(lib => new Smolblog(lib.apiBase, header, lib.siteId));
	},
	setSiteId(id: string) {
		update(lib => new Smolblog(lib.apiBase, lib.authHeader, id));
	},
}
