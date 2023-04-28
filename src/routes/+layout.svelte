<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import Navbar from './Navbar.svelte';
	import theme from '$lib/stores/theme';
	import context from '$lib/stores/context';

	import type { SmolblogContext } from '$lib/smolblog';
	import type { LayoutData } from './$types';

	// Import our custom CSS
	import '$lib/scss/index.scss';
	import LoginModal from './LoginModal.svelte';

	export let data: LayoutData;

	setContext('smolblog', context);
	setContext('theme', theme);

	if (data.context) {
		context.set(data.context);
	}

	onMount(async () => {
		const { Vault } = await import('@ultimate/vault');
		const bootstrap = await import('bootstrap');

		const localStorage = new Vault({});

		const contextUnsubscribe = context.subscribe(ctx => {
			if (ctx) {
				localStorage.set<SmolblogContext>('context', ctx);
			} else {
				localStorage.remove('context');
			}

			
			fetch('/setcookie', { method: 'POST', body: JSON.stringify(ctx) });
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

<Navbar userProfile={data.userProfile} />

<slot/>

<LoginModal />