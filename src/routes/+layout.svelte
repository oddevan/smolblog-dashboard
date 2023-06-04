<script lang="ts">
	import '../app.postcss';

	import { onMount, setContext } from 'svelte';
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode } from 'flowbite-svelte'

	import type { SmolblogContext } from '$lib/smolblog';
	import type { LayoutData } from './$types';
	
	export let data: LayoutData;
	
	import context from '$lib/stores/context';
	setContext('smolblog', context);

	if (data.context) {
		context.set(data.context);
	}

	onMount(async () => {
		const { Vault } = await import('@ultimate/vault');

		const localStorage = new Vault({});

		const contextUnsubscribe = context.subscribe((ctx) => {
			if (ctx) {
				localStorage.set<SmolblogContext>('context', ctx);
			} else {
				localStorage.remove('context');
			}
			fetch('/setcookie', { method: 'POST', body: JSON.stringify(ctx) });
		});

		return () => {
			contextUnsubscribe();
		};
	});
</script>

<svelte:head>
	<script>
		// On page load or when changing themes, best to add inline in `head` to avoid FOUC
		if (
			localStorage.getItem('color-theme') === 'dark' ||
			(!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark')
		}
	</script>
</svelte:head>

<div class="m-2 md:m-3">

	<Navbar let:hidden let:toggle rounded color="form">
		<NavBrand href="/">
			<img src="/images/flowbite-svelte-icon-logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span>
		</NavBrand>
		<NavHamburger on:click={toggle} />
		<NavUl {hidden}>
			<NavLi href="/" active={true}>Home</NavLi>
			<NavLi href="/about">About</NavLi>
			<NavLi href="/services">Services</NavLi>
			<NavLi href="/pricing">Pricing</NavLi>
			<NavLi href="/contact">Contact</NavLi>
		</NavUl>
		<DarkMode/>
	</Navbar>

	<!-- <slot /> -->

	{#if data.context?.apiBase}
		<p class="m-5 secondary-text text-end">
			Connected to Smolblog {data.serverVersion} on {new URL(data.context.apiBase).hostname}
		</p>
	{/if}

</div>