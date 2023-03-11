import { writable } from 'svelte/store';

export const getCurrentTheme = () => {
	return document.documentElement.dataset.bsTheme;
};

const { subscribe, update } = writable({
	userPref: 'auto',
	browserPref: 'light',
	currentTheme() {
		return this.userPref === 'auto' ? ( this.browserPref === 'dark' ? 'dark' : 'light' ) : this.userPref;
	}
});

export default {
	subscribe,
	setUserPref(pref: string) {
		update(current => { return { ...current, userPref: pref }; });
	},
	setBrowserPref(pref: string) {
		update(current => { return { ...current, browserPref: pref }; });
	},
};
