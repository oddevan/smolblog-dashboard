import type { RequestHandler } from "./$types";
import type { SmolblogContext } from "$lib/smolblog";

export const POST = (async ({ request, cookies }) => {
	try {
		const { apiBase, authHeader } = await request.json() as SmolblogContext;
		
		cookies.set('smolblog', JSON.stringify({ apiBase, authHeader }), { path: '/' });
	} catch (err) {
		cookies.delete('smolblog');
	}

	return new Response(null, { status: 204 });
}) satisfies RequestHandler;