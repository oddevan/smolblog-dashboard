<script lang="ts">
	import Navbar from './Navbar.svelte';
	import theme from '../lib/stores/theme';
	import { onMount } from 'svelte';
	import context from '$lib/stores/context';
	import user from "$lib/stores/user";
	import type { SmolblogContext } from '$lib/smolblog';


	// Import our custom CSS
	import '$lib/scss/index.scss';

	// Import all of Bootstrap's JS
	// @ts-ignore
	// import * as bootstrap from "bootstrap";

	onMount(async () => {
		const { Vault } = await import('@ultimate/vault');
		const bootstrap = await import('bootstrap');

		const localStorage = new Vault({});
		const localContext = localStorage.get<SmolblogContext>('context');
		if (localContext) {
			context.initWithContext(localContext);
		}

		const contextUnsubscribe = context.subscribe(api => {
			localStorage.set<SmolblogContext>('context', api.context);
			api.user?.profile.get().then(info => user.set(info));
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
