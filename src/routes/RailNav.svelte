<script lang="ts">
	import Snek from "$lib/components/Icons/Snek.svelte";
	import { AppRail, AppRailAnchor, Avatar } from "@skeletonlabs/skeleton";
	import { page } from '$app/stores';
	import type { Site } from "$lib/smolblog/types";

	export let allSites: Site[];
	export let emailHash: string = '00000000000000000000000000000000';
</script>

<AppRail class={$$props.class}>
	<svelte:fragment slot="lead">
		<AppRailAnchor href="/">
			<svelte:fragment slot="lead">
				<Snek />
			</svelte:fragment>
		</AppRailAnchor>
	</svelte:fragment>

	{#each allSites as site (site.id)}
		{@const { handle, displayName, baseUrl } = site}
		{@const dashUrl = `/site/${handle}`}
		<AppRailAnchor
			href={dashUrl}
			selected={$page.url.pathname.startsWith(dashUrl)}
			title={displayName}
		>
			<svelte:fragment slot="lead">
				<Avatar initials={site.displayName.substring(0, 2)} width="w-10" />
			</svelte:fragment>
			{site.handle}
		</AppRailAnchor>
	{/each}

	<svelte:fragment slot="trail">
		<AppRailAnchor href="/account" title="Account" selected={$page.url.pathname.startsWith('/account')}>
			<svelte:fragment slot="lead">
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