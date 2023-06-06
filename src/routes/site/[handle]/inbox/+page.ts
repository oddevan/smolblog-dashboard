import type { PageLoad } from './$types';

export const load = (() => {
  return { title: 'Inbox' };
}) satisfies PageLoad;