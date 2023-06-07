<script lang="ts">
	import '../app.postcss';

	import { onMount, setContext } from 'svelte';
	import {
		Navbar,
		NavBrand,
		DarkMode,
		Button,
		Avatar,
		MegaMenu,
		Sidebar,
		SidebarWrapper,
		SidebarGroup,
		SidebarItem,
		Card,
		Label,
		Input,
		Checkbox
	} from 'flowbite-svelte';

	import type { SmolblogContext } from '$lib/smolblog';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	import context from '$lib/stores/context';
	import type { LinkType } from 'flowbite-svelte/dist/types';
	import SiteDisplay from '$lib/components/SiteDisplay.svelte';
	import SmolblogLogo from '$lib/components/SmolblogLogo.svelte';
	import LoginModal from './LoginModal.svelte';
	import { page } from '$app/stores';
	import AccountSidebar from '$lib/components/AccountSidebar.svelte';
	import { Site, User } from '$lib/components/Icons';
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

{#if $context?.authHeader}
	<Navbar class="bg-white dark:bg-boop">
		<NavBrand href="/">
			<SmolblogLogo />
		</NavBrand>
		<div class="flex justify-end items-center">
			<Button class="bg-snek dark:bg-snek mr-2" size="xs">
				<Avatar size="sm">
					<User size={4} />
				</Avatar>
				{#if $page.data.currentSite}
					<Avatar size="sm" stacked>
						<Site size={4} />
					</Avatar>
				{/if}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-6 -mr-2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
					/>
				</svg>
			</Button>
			<MegaMenu full>
				{#each data.userSites ?? [] as site}
					<li class="col-span-2 sm:col-auto">
						<SiteDisplay {site} />
					</li>
				{/each}
				<svelte:fragment slot="extra">
					<AccountSidebar />
				</svelte:fragment>
			</MegaMenu>
			<DarkMode size="lg" />
		</div>
	</Navbar>

	<div class="m-2 md:m-3">
		<slot />

		{#if data.context?.apiBase}
			<p class="m-5 secondary-text text-end">
				Connected to Smolblog {data.serverVersion} on {new URL(data.context.apiBase).hostname}
			</p>
		{/if}
	</div>
{:else}
	<div class="grid grid-cols-1 h-screen place-content-center">
		<LoginModal />
	</div>
{/if}
