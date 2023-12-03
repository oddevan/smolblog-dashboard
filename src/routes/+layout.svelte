<script lang="ts">
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppBar, Drawer, Modal, getDrawerStore, getModalStore, initializeStores, storePopup, type ModalSettings } from '@skeletonlabs/skeleton';
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
	const modalStore = getModalStore();
	let emailHash: string = '00000000000000000000000000000000';
	$: emailHash = md5($page.data.user?.email ?? 'example@example.com').toString();

	const serverInfoModalSettings: ModalSettings = {
		type: 'alert',
		title: 'License information',
		body: '',
	};
	$: if (data.server?.license) {
		const {key, notice, href, source} = data.server.license;
		serverInfoModalSettings.body = `
			<h4 class="h4 mb-4">
				${key.startsWith('AGPL') ?
				'As a user of this server, you have the right to the source code.' :
				'Smolblog is free and open source software.'}
			</h4>

			${notice}

			<p class="my-4"><a href="${href}" class="btn variant-filled-secondary" target="_blank">View full license</a></p>

			<h4 class="h4 mb-4">Open source code used on this server</h4>

			<ul>
				${Object.entries(source ?? {}).map(([pkg, link]) => `<li><a class="anchor" href="${link}">${pkg}</a></li>`).join(' ')}
			</ul>
		`;
	} else {
		serverInfoModalSettings.body = '';
	}

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
	<MediaForm mediaId={$drawerStore.meta?.mediaId} siteApi={$drawerStore.meta?.siteApi} closeFunction={$drawerStore.meta?.closeFunction} />
	{:else if $drawerStore.id === 'ContentForm'}
	<ContentForm contentId={$drawerStore.meta?.contentId} siteApi={$drawerStore.meta?.siteApi} closeFunction={$drawerStore.meta?.closeFunction} />
	{/if}
</Drawer>

<!-- Only one Modal per app -->
<Modal
	components={{ mediaSelection: { ref: MediaSelection } }}
	regionBody="max-h-60 overflow-y-auto"
/>

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
				<button class="btn btn-sm variant-soft-secondary" on:click={() => modalStore.trigger(serverInfoModalSettings)}
					>Connected to Smolblog {$page.data.server?.serverVersion} at {PUBLIC_SERVER_URL}</button
				>
				<a href="/auth/logout" class="btn btn-sm variant-soft-error"> Log out </a>
			</p>
		</svelte:fragment>
	</AppShell>
{:else}
	<slot />
{/if}
