<script lang="ts">
	import type { Site } from "$lib/smolblog/types";
	import { page } from '$app/stores';
	import { Avatar, getDrawerStore } from "@skeletonlabs/skeleton";
	import Snek from "$lib/components/Icons/Snek.svelte";

	const drawerStore = getDrawerStore();
	const closeDrawer = () => setTimeout(() => drawerStore.close(), 10);

	export let allSites: Site[];
	export let emailHash: string = '00000000000000000000000000000000';
</script>

<div class="p-4">
	<nav class="list-nav">
		<ul>
			<li>
				<a href="/" on:click={closeDrawer}>
					<span><Snek/></span>
					<span class="flex-auto">Smolblog</span>
				</a>
			</li>
			{#each allSites as site (site.id)}
				{@const { handle, displayName, baseUrl } = site}
				{@const dashUrl = `/site/${handle}/`}
				<li>
					<a href={dashUrl} class={$page.url.pathname.startsWith(dashUrl) ? '!bg-primary-500' : ''} on:click={closeDrawer}>
						<span><Avatar initials={site.displayName.substring(0, 2)} width="w-10" /></span>
						<span class="flex-auto">
							{handle}<br>
							{displayName}
						</span>
					</a>
				</li>
			{/each}
			<li>
				<a href='/account' class={$page.url.pathname.startsWith('/account') ? '!bg-primary-500' : ''} on:click={closeDrawer}>
					<span>
						<Avatar
							initials="SB"
							src={`https://www.gravatar.com/avatar/${emailHash}.jpg?s=48&d=mp`}
							width="w-10"
						/>
					</span>
					<span class="flex-auto">
						My Account
					</span>
				</a>
			</li>
		</ul>
	</nav>
</div>