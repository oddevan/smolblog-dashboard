import type { SmolblogContext } from "$lib/smolblog";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
	const cookie = cookies.get('smolblog');
	const parsed = cookie ? JSON.parse(cookie) : undefined;

	let context: SmolblogContext|undefined;
	if (parsed?.apiBase) {
		context = parsed;
	}

	return { context };
}) satisfies LayoutServerLoad;