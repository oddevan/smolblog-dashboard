import type { PageLoad } from './$types';

export const load = (() => {
  return { title: 'Add New' };
}) satisfies PageLoad;