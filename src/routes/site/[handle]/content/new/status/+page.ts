import type { PageLoad } from './$types';

export const load = (() => {
  return { title: 'New Status' };
}) satisfies PageLoad;