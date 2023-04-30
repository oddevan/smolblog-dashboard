import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
  const { userSites } = await parent();
  if (userSites?.length == 1) {
    throw redirect(302, `/site/${userSites[0].handle}`);
  }

  return { breadcrumbs: [] };
}) satisfies PageLoad;