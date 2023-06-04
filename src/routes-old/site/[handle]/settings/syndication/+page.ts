import Smolblog from '$lib/smolblog';
import type { ConnectorChannelPlusLink } from '$lib/smolblog/types';
import type { PageLoad } from './$types';

export const load = (async ({ parent, fetch }) => {
  const { context, currentSite } = await parent();
  let initialData: ConnectorChannelPlusLink[] = [];

  if (context?.authHeader && currentSite) {
    const api = new Smolblog(context, fetch);
    initialData = await api.site(currentSite.id).settings.channels.get();
  }

  return { title: 'Syndication', initialData };
}) satisfies PageLoad;