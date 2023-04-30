import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (() => {
    throw redirect(301, '/');
}) satisfies LayoutLoad;
