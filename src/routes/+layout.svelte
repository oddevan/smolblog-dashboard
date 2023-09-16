<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppRail, AppRailAnchor, autoModeWatcher, Avatar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import Snek from '$lib/components/Icons/snek.svelte';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	export const ssr = false;

	export let data: LayoutData;

	onMount(() => {
		if (!data.context.token && !$page.url.pathname.startsWith('/auth/')) {
			goto('/auth/login');
		}
	});
</script>

<!-- Match light/dark mode to OS -->
<svelte:head>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head>

{#if data.context.token}

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			<svelte:fragment slot="lead">
				<AppRailAnchor href="/">
					<svelte:fragment slot="lead">
						<Snek/>
					</svelte:fragment>
				</AppRailAnchor>
			</svelte:fragment>
			<AppRailAnchor href="/" selected={$page.url.pathname === '/'}>
				<svelte:fragment slot="lead">
					<Avatar initials="SB" src="av.png" width="w-10"/>
				</svelte:fragment>
				(icon)
			</AppRailAnchor>
			<AppRailAnchor href="/about" selected={$page.url.pathname === '/about'}>
				<svelte:fragment slot="lead">
					<Avatar initials="SB" src="av.png" width="w-10"/>
				</svelte:fragment>
				(icon)
			</AppRailAnchor>
			<svelte:fragment slot="trail">
				<AppRailAnchor href="/" target="_blank" title="Account">
					<svelte:fragment slot="lead">
						<Avatar initials="SB" src="av.png" width="w-10"/>
					</svelte:fragment>
					(icon)
				</AppRailAnchor>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

{:else}
<slot/>
{/if}