import type { LayoutServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
    const context = cookies.get('smolblog');

    return {
        user: await db.getUser(sessionid)
    };
}) satisfies LayoutServerLoad;