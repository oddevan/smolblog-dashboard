import type { PageLoad } from './$types';

export const load = (() => {
  return { title: 'Syndication' };
}) satisfies PageLoad;