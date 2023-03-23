import context from "$lib/stores/context";
import type { LayoutLoad } from "./$types";

export const prerender = true;

export const load = (() => {
	context.init('//smolblog.test/wp-json/smolblog/v2');
	context.setAuthHeader('Basic 12334567890asdfghjkl');

	return {
		breadcrumbs: [{ path: '/', title: 'Dashboard' }],
		title: 'Dashboard',
	}
}) satisfies LayoutLoad;