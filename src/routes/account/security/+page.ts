import type { PageLoad } from './$types';

export const load = (() => {
  return { title: 'Security' };
}) satisfies PageLoad;