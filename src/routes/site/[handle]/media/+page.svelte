<script lang="ts">
	import { Paginator, ProgressBar, getDrawerStore } from "@skeletonlabs/skeleton";
	import { mediaDrawerOptions } from "$lib/components/MediaForm.svelte"
	import type { PageData } from "./$types";
	import smolblog from "$lib/smolblog";
	import { Upload } from "$lib/components/Icons";

	export let data: PageData;

	const total = data.mediaCount ?? 0;
	const api = smolblog(data.context);
	const drawerStore = getDrawerStore();
	
	let paginationSettings = {
		page: 0,
		limit: 12,
		size: total,
		amounts: [12,24,48].filter(num => num <= total).concat(total),
	};

	const getContent =
		(page: number, limit: number) =>	api.site(data.site?.id)?.media.list(page, limit)
		.then(res => res.content);
	
	const getDrawerFunc = (mediaId: string) => {
		return () => drawerStore.open({
			...mediaDrawerOptions,
			meta: {
				mediaId,
				siteApi: api.site(data.site?.id),
				closeFunction: () => {
					drawerStore.close();
					paginationSettings = { ...paginationSettings, page: 0 };
				}
			}
		});
	};
</script>


<div class="flex items-center justify-between mb-5">
	<h2 class="h2">All Media</h2>
	<button
		on:click={() => drawerStore.open({...mediaDrawerOptions, meta: {siteApi: api.site(data.site?.id)}})}
		class="btn btn-sm variant-filled-primary"
	>
		<Upload size="medium" />
		<span>Upload</span>
	</button>
</div>

<Paginator
	bind:settings={paginationSettings}
	showFirstLastButtons="{true}"
	showPreviousNextButtons="{true}"
/>
{#await getContent(paginationSettings.page + 1, paginationSettings.limit)}
	<ProgressBar meter="bg-primary-900-50-token" track="bg-primary-200-700-token" />
{:then mediaList}
	<div class="my-3 grid grid-cols-2 gap-2 sm:!grid-cols-4 md:!grid-cols-6 lg:!grid-cols-8">
		{#each mediaList ?? [] as media}
			<button on:click={getDrawerFunc(media.id)}>
				<img src={media.thumbnailUrl} alt={media.title} class="w-full h-auto">
			</button>
		{/each}
	</div>
{/await}

<Paginator
	bind:settings={paginationSettings}
	showFirstLastButtons="{true}"
	showPreviousNextButtons="{true}"
/>