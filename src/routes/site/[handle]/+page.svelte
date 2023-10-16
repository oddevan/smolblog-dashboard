<script lang="ts">
	import { page } from "$app/stores";
	import ContentIcon from "$lib/components/ContentIcon.svelte";
	import { ArrowOut, Edit, Trash } from "$lib/components/Icons";
	import type { PageData } from "./$types";

	export let data: PageData;
	let contentList = data.content;
	
</script>

<div class="table-container">
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
			{#each contentList as content (content.id)}
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
					<a href={`${$page.url.pathname}/edit/${content.id}`} class="btn btn-sm variant-filled-secondary">
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