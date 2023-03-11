<script lang="ts">
	import Navbar from './Navbar.svelte';
	import theme from '../lib/stores/theme'

	// Import our custom CSS
	import '$lib/scss/index.scss';

	// Import all of Bootstrap's JS
	// @ts-ignore
	import * as bootstrap from "bootstrap";
	import { onMount } from 'svelte';

	let currentTheme = '';
	let prefersDarkMode = false;

	onMount(() => {
		let active = false;
		const updateThemeAttribute = () => {
			if (active) {
				const themeVal = currentTheme === 'auto' ? ( prefersDarkMode ? 'dark' : 'light' ) : currentTheme;
				document.documentElement.dataset.bsTheme = themeVal;
			}
		};

		const matcher = window.matchMedia("(prefers-color-scheme: dark)");
		matcher.addEventListener('change', e => {
			prefersDarkMode = e.matches
			updateThemeAttribute();
		});
		prefersDarkMode = matcher.matches;

		const unsub = theme.subscribe(storeVal => {
			currentTheme = storeVal;
			updateThemeAttribute();
		});

		active = true;
		updateThemeAttribute();
		return unsub;
	});
</script>

<Navbar/>

<slot/>

<p>Theme: {currentTheme} | Prefers dark? {prefersDarkMode ? 'yes' : 'no'}</p>

<div class="btn-group" role="group" aria-label="Theme">
  <button on:click={() => theme.set('light')} type="button" class="btn btn-light">Light</button>
  <button on:click={() => theme.set('dark')} type="button" class="btn btn-dark">Dark</button>
  <button on:click={() => theme.set('auto')} type="button" class="btn btn-secondary">Auto</button>
</div>