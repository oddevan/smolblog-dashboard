<script lang="ts">
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppBar, localStorageStore, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import '../app.postcss';
	import {
		AppShell,
		AppRail,
		AppRailAnchor,
		autoModeWatcher,
		Avatar
	} from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import Snek from '$lib/components/Icons/Snek.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import md5 from 'crypto-js/md5';
	import ArrowOut from '$lib/components/Icons/ArrowOut.svelte';
	import { PUBLIC_SERVER_URL } from '$env/static/public';

	export let data: LayoutData;

	onMount(() => {
		if (!data.context.token && !$page.url.pathname.startsWith('/auth/')) {
			goto('/auth/login');
		}
	});
</script>

<!-- Match light/dark mode to OS -->
<svelte:head
	>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head
>

{#if data.context.token}
	<AppShell>
		<svelte:fragment slot="sidebarLeft">
			<AppRail>
				<svelte:fragment slot="lead">
					<AppRailAnchor href="/">
						<svelte:fragment slot="lead">
							<Snek />
						</svelte:fragment>
					</AppRailAnchor>
				</svelte:fragment>

				{#each data.allSites as site (site.id)}
					{@const { handle, displayName, baseUrl } = site}
					{@const dashUrl = `/site/${handle}/`}
					<AppRailAnchor
						href={dashUrl}
						selected={$page.url.pathname === dashUrl}
						title={displayName}
					>
						<svelte:fragment slot="lead">
							<Avatar initials={site.displayName.substring(0, 2)} width="w-10" />
						</svelte:fragment>
						{site.handle}
					</AppRailAnchor>
				{/each}

				<svelte:fragment slot="trail">
					<AppRailAnchor href="/account" title="Account">
						<svelte:fragment slot="lead">
							{@const emailHash = md5($page.data.user?.email ?? 'example@example.com')}
							<Avatar
								initials="SB"
								src={`https://www.gravatar.com/avatar/${emailHash}.jpg?s=48&d=mp`}
								width="w-10"
							/>
						</svelte:fragment>
						Account
					</AppRailAnchor>
				</svelte:fragment>
			</AppRail>
		</svelte:fragment>
		<svelte:fragment slot="pageHeader">
			<AppBar>
				<svelte:fragment slot="lead">
					{#if $page.data.site}
						{@const { handle, displayName } = $page.data.site}
						<ol class="breadcrumb">
							<li class="crumb"><a class="anchor" href={`/site/${handle}/`}>{displayName}</a></li>
							<li class="crumb-separator" aria-hidden>&rsaquo;</li>
						</ol>
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="trail">
					{#if $page.data.site}
						{@const { baseUrl } = $page.data.site}
						<a href={baseUrl} class="btn btn-sm variant-filled-primary">
							<span><ArrowOut size={5} /></span>
							<span>Visit site</span>
						</a>
						<a href={`${baseUrl}/wp-admin`} class="btn btn-sm variant-filled-tertiary">
							<span><ArrowOut size={5} /></span>
							<span>WP Admin</span>
						</a>
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="headline"><h1 class="h1">{$page.data.section}</h1></svelte:fragment>
			</AppBar>
		</svelte:fragment>
		<slot />
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
