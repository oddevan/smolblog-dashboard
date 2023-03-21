<script lang="ts">
	import Navbar from './Navbar.svelte';
	import theme from '../lib/stores/theme';
	import { onMount } from 'svelte';
	import context from '$lib/stores/context';
	import { Vault } from '@ultimate/vault';
	import type { SmolblogContext } from '$lib/smolblog';


	// Import our custom CSS
	import '$lib/scss/index.scss';

	// Import all of Bootstrap's JS
	// @ts-ignore
	import * as bootstrap from "bootstrap";

	onMount(() => {
		const localStorage = new Vault({});
		const localContext = localStorage.get<SmolblogContext>('context');
		if (localContext) {
			context.initWithContext(localContext);
		}

		const contextUnsubscribe = context.subscribe(api => {
			localStorage.set<SmolblogContext>('context', api.context);
		})

		const matcher = window.matchMedia("(prefers-color-scheme: dark)");
		theme.setBrowserPref(matcher.matches ? 'dark' : 'light');
		matcher.addEventListener('change', e => {
			theme.setBrowserPref(e.matches ? 'dark' : 'light');
		});

		const themeUnsubscribe = theme.subscribe(storeVal => {
			document.documentElement.dataset.bsTheme = storeVal.currentTheme();
		});

		return () => {
			contextUnsubscribe();
			themeUnsubscribe();
		};
	});
</script>

<Navbar/>

<slot/>
