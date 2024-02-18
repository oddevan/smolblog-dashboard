<script lang="ts">
	import { Avatar } from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";
	import { Plus } from "$lib/components/Icons";

	export let data: PageData;
</script>

<style lang="postcss">
	div.sitegrid {
		@apply grid auto-rows-fr gap-4;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
	}
</style>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center w-full">
		<h2 class="h2">Welcome to Smolblog</h2>
		<p>Pick (or create) a blog and get started!</p>
		<div class="sitegrid">
			{#each data.allSites as site (site.id)}
				{@const { handle, displayName, baseUrl } = site}
				{@const dashUrl = `/site/${handle}/`}
				<a href={dashUrl} class='card variant-ghost-surface flex flex-row items-center p-4 overflow-x-hidden'>
					<span><Avatar initials={site.displayName.substring(0, 2)} width="w-20 me-4" /></span>
					<span class="flex flex-col justify-start text-left">
						<span>{handle}</span>
						<span>{displayName}</span>
						<span class="text-current/25">{baseUrl}</span>
					</span>
				</a>
			{/each}
			{#if data.user?.features.includes('create-site') }
			<a href="/site/create" class="card variant-filled-surface flex items-center justify-center">
				<Plus size="large" class="me-2"/> Create New Site
			</a>
			{/if}
		</div>
	</div>
</div>
