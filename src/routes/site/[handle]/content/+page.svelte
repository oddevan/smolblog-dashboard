<script lang="ts">
	import { page } from "$app/stores";
	import ContentIcon from "$lib/components/ContentIcon.svelte";
	import { contentDrawerOptions } from "$lib/components/ContentForm.svelte";
	import { ArrowOut, Create, Edit, Trash } from "$lib/components/Icons";
	import { Paginator, ProgressBar, getDrawerStore } from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";
	import smolblog from "$lib/smolblog";

	export let data: PageData;

	const total = data.contentCount ?? 0;
	const api = smolblog(data.context);
	const drawerStore = getDrawerStore();
	
	let paginationSettings = {
		page: 0,
		limit: 10,
		size: total,
		amounts: [5,10,20,50].filter(num => num <= total).concat(total < 100 ? total : 100),
	};

	const getContent =
		(page: number, limit: number) =>	api.site(data.site?.id)?.content.list(page, limit)
		.then(res => res.content);
	
	const formatDate = (pub?: Date) => pub ? `${pub.toLocaleDateString()} ${pub.toLocaleTimeString()}` : '';
	const closeFunction = () => {
		drawerStore.close();
		paginationSettings = { ...paginationSettings, page: 0 };
	};
	
	const getDrawerFunc = (contentId: string) => {
		return () => drawerStore.open({
			...contentDrawerOptions,
			meta: {
				contentId,
				siteApi: api.site(data.site?.id),
				closeFunction
			}
		});
	};
</script>

<div class="flex items-center justify-between mb-5">
	<h2 class="h2">All Content</h2>
	<button
		on:click={() => drawerStore.open({
			...contentDrawerOptions,
			meta: {siteApi: api.site(data.site?.id), closeFunction}
		})}
		class="btn btn-sm variant-filled-primary"
	>
		<Create size="medium" />
		<span>Add new</span>
	</button>
</div>

<Paginator
	bind:settings={paginationSettings}
	showFirstLastButtons="{true}"
	showPreviousNextButtons="{true}"
/>
{#await getContent(paginationSettings.page + 1, paginationSettings.limit)}
	<ProgressBar meter="bg-primary-900-50-token" track="bg-primary-200-700-token" />
{:then contentList}
<div class="table-container my-3">
	<table class="table table-hover">
		<thead>
			<tr>
				<th class="table-cell-fit">Type</th>
				<th>Title</th>
				<th>Published</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each contentList ?? [] as content (content.id)}
			<tr>
				<td class="table-cell-fit">
					<ContentIcon type={content.contentType.type} size="small"/>
				</td>
				<td>
					<button type="button" on:click={getDrawerFunc(content.id)} class="!bg-transparent whitespace-normal">
						<span>{content.title}</span>
					</button>
				</td>
				<td>{content.visibility == 'draft' ? 'Draft' : formatDate(content.publishTimestamp)}</td>
				<td>
					{#if content.permalink}
					<a href={`${data.site?.baseUrl}${content.permalink}`} class="btn btn-sm variant-filled-tertiary">
						<span><ArrowOut size="small" /></span>
						<span>View</span>
					</a>
					{:else}
					<span class="btn btn-sm variant-ghost-tertiary">
						<span><ArrowOut size="small" /></span>
						<span>View</span>
					</span>
					{/if}
					<button on:click={getDrawerFunc(content.id)} class="btn btn-sm variant-filled-secondary">
						<span><Edit size="small" /></span>
						<span>Edit</span>
					</button>
					<button class="btn btn-sm variant-filled-error">
						<span><Trash size="small" /></span>
						<span>Delete</span>
					</button>
				</td>
			</tr>
			{/each}
		</tbody>
	</table>
</div>
{/await}

<Paginator
	bind:settings={paginationSettings}
	showFirstLastButtons="{true}"
	showPreviousNextButtons="{true}"
/>