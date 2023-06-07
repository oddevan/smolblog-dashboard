import { writable, type Readable } from 'svelte/store';

export interface DashboardTheme {
	userPref: string;
	browserPref: string;
	currentTheme: () => string;
}
export interface DashboardThemeStore extends Readable<DashboardTheme> {
	setUserPref: (pref: string) => void;
	setBrowserPref: (pref: string) => void;
}

export const getCurrentTheme = () => {
	return document.documentElement.dataset.bsTheme;
};

const { subscribe, update } = writable({
	userPref: 'auto',
	browserPref: 'light',
	currentTheme() {
		return this.userPref === 'auto'
			? this.browserPref === 'dark'
				? 'dark'
				: 'light'
			: this.userPref;
	}
});

const store: DashboardThemeStore = {
	subscribe,
	setUserPref(pref: string) {
		update((current) => {
			return { ...current, userPref: pref };
		});
	},
	setBrowserPref(pref: string) {
		update((current) => {
			return { ...current, browserPref: pref };
		});
	}
};
export default store;
