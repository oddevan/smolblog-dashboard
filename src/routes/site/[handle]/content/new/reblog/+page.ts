import type { PageLoad } from './$types';

export const load = (() => {
  return { title: 'New Reblog' };
}) satisfies PageLoad;