<script lang="ts">
	import type { Content } from "$lib/smolblog/types";

	export let row: Content;
	export let baseUrl = '';

	const { id, title, visibility, publishTimestamp, permalink } = row;
	const fullPermalink = `${baseUrl}${permalink}`;
</script>

<div class="row">
	<div class="col-sm-6">
		<h6><a href="edit/{id}">{title}</a></h6>
	</div>
	<div class="col-sm-6">
		<div class="row">
			<div class="col-5">{visibility}</div>
			{#if visibility === 'published'}
			<div class="col-5">{publishTimestamp}</div>
			<div class="col-2"><a href="{fullPermalink}" class="btn btn-sm btn-outline-secondary">View</a></div>
			{/if}
		</div>
	</div>
</div>