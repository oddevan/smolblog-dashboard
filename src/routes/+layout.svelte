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

	const menuSites: (LinkType & { [propName: string]: any })[] =
		data.userSites?.map((site) => {
			return {
				name: site.displayName,
				href: `/site/${site.handle}`,
				site
			};
		}) ?? [];
</script>

{#if $context?.authHeader}
	<Navbar let:hidden let:toggle class="bg-white dark:bg-boop">
		<NavBrand href="/">
			<SmolblogLogo />
		</NavBrand>
		<div class="flex justify-end items-center">
			<Button class="bg-snek dark:bg-snek mr-2" size="xs">
				<Avatar size="sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-4 h-4"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
						/>
					</svg>
				</Avatar>
				{#if $page.data.currentSite}
					<Avatar size="sm" stacked>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-4 h-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z"
							/>
						</svg>
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
			<MegaMenu full items={menuSites ?? []} let:item>
				<SiteDisplay site={item.site} />
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
