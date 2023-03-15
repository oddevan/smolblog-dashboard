import { Vault } from '@ultimate/vault';
import { writable } from 'svelte/store';

const localStorage = new Vault({});
const { subscribe, set } = writable<string>(localStorage.get<string>('authHeader') ?? '');

export default {
	subscribe,
	setBearerToken: (token: string) => {
		const header = `Bearer ${token}`;
		localStorage.set<string>('authHeader', header);
		set(header);
	},
	setBasicAuth: (name: string, pass: string) => {
		const header = `Basic ${Buffer.from(`${name}:${pass}`).toString("base64")}`;
		localStorage.set<string>('authHeader', header);
		set(header);
	},
	removeAuth: () => {
		set('');
		localStorage.remove('authHeader');
	}
};

