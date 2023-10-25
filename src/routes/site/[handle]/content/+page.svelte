<script lang="ts">
	import { page } from "$app/stores";
	import ContentIcon from "$lib/components/ContentIcon.svelte";
	import { ArrowOut, Edit, Trash } from "$lib/components/Icons";
	import { Paginator, ProgressBar } from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";
	import smolblog from "$lib/smolblog";

	export let data: PageData;

	const total = data.contentCount ?? 0;
	const api = smolblog(data.context);
	
	let paginationSettings = {
		page: 0,
		limit: 10,
		size: total,
		amounts: [5,10,20,50].filter(num => num <= total).concat(total < 100 ? total : 100),
	};

	const getContent =
		(page: number, limit: number) =>	api.site(data.site?.id)?.content.list(page, limit)
		.then(res => res.content);
</script>

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
				<td><a href={`${$page.url.pathname}/edit/${content.id}`}>{content.title}</a></td>
				<td>{content.visibility == 'draft' ? 'Draft' : content.publishTimestamp}</td>
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
					<a href={`/site/${data.site?.handle ?? '0'}/edit/${content.id}`} class="btn btn-sm variant-filled-secondary">
						<span><Edit size="small" /></span>
						<span>Edit</span>
					</a>
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