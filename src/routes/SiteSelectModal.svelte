<script lang="ts">
	import Icon from "$lib/components/Icon.svelte";
	import type { Site } from "$lib/smolblog/types";
	import { getContext, onMount } from "svelte";
	import Loading from "$lib/components/Loading.svelte";
	import Error from "$lib/components/Error.svelte";
	import type { SmolblogStore } from "$lib/stores/context";

	const context = getContext<SmolblogStore>('smolblog');

	let sites: Site[] = [];
	let siteName: string = 'Select Site';
	
	onMount(() => {
		return context.subscribe(async api => {
			siteName = api?.currentSite?.displayName ?? 'Select Site';
		});
	});
</script>

<button id="site-select-btn" type="button" class="btn btn-primary btn-block mb-3" data-bs-toggle="modal" data-bs-target="#siteSelectModal">
	<Icon icon="window-stack"/>
	{siteName}
</button>

<div class="modal fade" id="siteSelectModal" tabindex="-1" aria-labelledby="siteSelectModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="siteSelectModalLabel">Select Site</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="list-group list-group-flush">
					{#await $context?.user?.sites.get() ?? []}
						<Loading />
					{:then sites}
						{#each sites as site (site.id)}
						<button
							class="list-group-item list-group-item-action"
							data-bs-dismiss="modal"
							on:click={() => context.setCurrentSite(site)}
						>
							{site.displayName}
						</button>
						{/each}
					{:catch error}
						<Error {error}/>
					{/await}
				</div>
			</div>
		</div>
	</div>
</div>