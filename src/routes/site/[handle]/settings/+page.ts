import type { PageLoad } from './$types';

export const load = (() => {
  return { title: 'General' };
}) satisfies PageLoad;