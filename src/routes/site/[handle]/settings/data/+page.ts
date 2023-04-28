import type { PageLoad } from './$types';

export const load = (() => {
  return { title: 'Data' };
}) satisfies PageLoad;