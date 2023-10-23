<script lang="ts">
	import { page } from "$app/stores";
	import ContentIcon from "$lib/components/ContentIcon.svelte";
	import { ArrowOut, Edit, Trash } from "$lib/components/Icons";
	import { Paginator, ProgressBar } from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";
	import smolblog from "$lib/smolblog";

	export let data: PageData;

	const total = data.mediaCount ?? 0;
	const api = smolblog(data.context);
	
	let paginationSettings = {
		page: 0,
		limit: 10,
		size: total,
		amounts: [5,10,20,50].filter(num => num <= total),
	};

	const getContent =
		(page: number, limit: number) =>	api.site(data.site?.id)?.media.list(page, limit)
		.then(res => res.content);
</script>

<Paginator
	bind:settings={paginationSettings}
	showFirstLastButtons="{true}"
	showPreviousNextButtons="{true}"
/>
{#await getContent(paginationSettings.page + 1, paginationSettings.limit)}
	<ProgressBar meter="bg-primary-900-50-token" track="bg-primary-200-700-token" />
{:then mediaList}
	<div class="grid grid-cols-2 sm:!grid-cols-4 md:!grid-cols-6 lg:!grid-cols-8">
		{#each mediaList ?? [] as media}
			<div class="m-3">
				<img src={media.thumbnailUrl} alt={media.title} class="w-full h-auto">
			</div>
		{/each}
	</div>
{/await}

<Paginator
	bind:settings={paginationSettings}
	showFirstLastButtons="{true}"
	showPreviousNextButtons="{true}"
/>