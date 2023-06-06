import type { PageLoad } from './$types';

export const load = (() => {
  return { title: 'Reader' };
}) satisfies PageLoad;