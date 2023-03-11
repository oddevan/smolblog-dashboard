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
		const matcher = window.matchMedia("(prefers-color-scheme: dark)");
		theme.setBrowserPref(matcher.matches ? 'dark' : 'light');
		matcher.addEventListener('change', e => {
			theme.setBrowserPref(e.matches ? 'dark' : 'light');
		});

		return theme.subscribe(storeVal => {
			document.documentElement.dataset.bsTheme = storeVal.currentTheme();
		});
	});
</script>

<Navbar/>

<slot/>
