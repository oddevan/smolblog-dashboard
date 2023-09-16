import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	const { searchParams } = url;

	const code = searchParams.get('code');
	const state = searchParams.get('state');

	return { code, state };
};