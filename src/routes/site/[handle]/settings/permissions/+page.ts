import Smolblog from '$lib/smolblog';
import type { UserAndPermissions } from '$lib/smolblog/types';
import type { PageLoad } from './$types';

export const load = (async ({ parent, fetch }) => {
  const { context, currentSite } = await parent();
  let initialData: UserAndPermissions[] = [];

  if (context?.authHeader && currentSite) {
    const api = new Smolblog(context, fetch);
    initialData = await api.site(currentSite.id).settings.users.get();
  }

  return { title: 'Permissions', initialData };
}) satisfies PageLoad;