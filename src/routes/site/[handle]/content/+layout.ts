import type { LayoutLoad } from './$types';

export const load = (async ({ parent }) => {
	const parentData = await parent();

	return {
		breadcrumbs: [...parentData.breadcrumbs, { path: '/content', title: 'Content' }],
		subnav: [
			{ path: `/site/${parentData.currentSite?.handle}/content`, title: 'Published' },
			{ path: `/site/${parentData.currentSite?.handle}/content/drafts`, title: 'Drafts' }
		]
	};
}) satisfies LayoutLoad;
