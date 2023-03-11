import { writable } from 'svelte/store';

export const getCurrentTheme = () => {
	return document.documentElement.dataset.bsTheme;
};

const theme = writable('auto');

export default theme;