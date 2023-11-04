<script lang="ts">
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppBar, Drawer, Modal, getDrawerStore, initializeStores, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();

	import '../app.postcss';
	import {
		AppShell,
		autoModeWatcher,
	} from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import md5 from 'crypto-js/md5';
	import ArrowOut from '$lib/components/Icons/ArrowOut.svelte';
	import { PUBLIC_SERVER_URL } from '$env/static/public';
	import RailNav from './RailNav.svelte';
	import DrawerNav from './DrawerNav.svelte';
	import { Menu } from '$lib/components/Icons';
	import MediaForm from '$lib/components/MediaForm.svelte';
	import ContentForm from '$lib/components/ContentForm.svelte';
	import MediaSelection from '$lib/components/MediaSelection.svelte';

	export let data: LayoutData;
	const drawerStore = getDrawerStore();
	let emailHash: string = '00000000000000000000000000000000';
	$: emailHash = md5($page.data.user?.email ?? 'example@example.com').toString()

	onMount(() => {
		if (!data.context.token && !$page.url.pathname.startsWith('/auth/')) {
			goto('/auth/login');
		}
	});
</script>

<!-- Only one Drawer per app -->
<Drawer>
	{#if $drawerStore.id === 'DrawerNav'}
	<DrawerNav allSites={data.allSites} {emailHash} />
	{:else if $drawerStore.id === 'MediaForm'}
	<MediaForm mediaId={$drawerStore.meta?.mediaId} siteApi={$drawerStore.meta?.siteApi} />
	{:else if $drawerStore.id === 'ContentForm'}
	<ContentForm contentId={$drawerStore.meta?.contentId} siteApi={$drawerStore.meta?.siteApi} />
	{/if}
</Drawer>

<!-- Only one Modal per app -->
<Modal components={{ mediaSelection: { ref: MediaSelection } }} />

{#if data.context.token}
	<AppShell>
		<svelte:fragment slot="sidebarLeft">
			<RailNav class="hidden sm:grid" allSites={data.allSites} {emailHash} />
		</svelte:fragment>
		<svelte:fragment slot="pageHeader">
			<AppBar>
				<svelte:fragment slot="lead">
					<button
						class="btn-icon me-2 sm:hidden"
						on:click={() => drawerStore.open({ id: 'DrawerNav', width: 'w-[280px]' })}
					>
						<Menu alt="Main navigation"/>
					</button>
					{#if $page.data.site}
						{@const { handle, displayName } = $page.data.site}
						<ol class="breadcrumb">
							<li class="crumb"><a class="anchor text-primary-500" href={`/site/${handle}/`}>{displayName}</a></li>
							<li class="crumb-separator" aria-hidden>&rsaquo;</li>
						</ol>
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="trail">
					{#if $page.data.site}
						{@const { baseUrl } = $page.data.site}
						<a href={baseUrl} class="btn btn-sm variant-filled-primary">
							<span><ArrowOut size='small' /></span>
							<span>Visit site</span>
						</a>
						<a href={`${baseUrl}/wp-admin`} class="btn btn-sm variant-filled-tertiary">
							<span><ArrowOut size='small' /></span>
							<span>WP Admin</span>
						</a>
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="headline"><h1 class="h1">{$page.data.section}</h1></svelte:fragment>
			</AppBar>
		</svelte:fragment>
		<slot/>
		<svelte:fragment slot="pageFooter">
			<p class="text-end p-4">
				<span class="opacity-50"
					>Connected to Smolblog {$page.data.server?.serverVersion} at {PUBLIC_SERVER_URL}.</span
				>
				<a href="/auth/logout" class="btn btn-sm variant-soft-error"> Log out </a>
			</p>
		</svelte:fragment>
	</AppShell>
{:else}
	<slot />
{/if}
