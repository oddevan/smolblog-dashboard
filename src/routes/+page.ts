import type { PageLoad } from './$types';

export const load = (() => {
  return { breadcrumbs: [] };
}) satisfies PageLoad;