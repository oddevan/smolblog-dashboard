import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import type { AuthState, AuthStateStore } from './auth';

export function getLocalStateStore(): AuthStateStore {
	const store = localStorageStore('smolAuthState', {
		state: '',
		challenge: ''
	});

	return {
		getAuthState: () => get(store),
		setAuthState: (authState: AuthState) => store.set(authState)
	};
}
