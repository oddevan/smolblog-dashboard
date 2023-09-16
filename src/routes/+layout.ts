import { browser } from '$app/environment';
import type { SmolblogContext } from '$lib/smolblog/types';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';
import { localStorageStore } from "@skeletonlabs/skeleton";

export const load: LayoutLoad = () => {
	let context: SmolblogContext = { token: null };

	if (browser) {
		const store = localStorageStore<{ token: string|null }>('smolContext', { token: null });
		context = get(store);
	}

	return { context };
};