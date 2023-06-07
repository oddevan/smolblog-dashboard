<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import type { Content } from '$lib/smolblog/types';

	export let row: Content;
	export let baseUrl = '';

	const { id, title, visibility, publishTimestamp, permalink, contentType } = row;
	const fullPermalink = `${baseUrl}${permalink}`;
	const type = contentShortName(contentType?.typeClass ?? '');

	function contentShortName(contentType: string): string | null {
		switch (contentType) {
			case 'Smolblog\\Core\\Content\\Types\\Status\\Status':
				return 'status';
			case 'Smolblog\\Core\\Content\\Types\\Reblog\\Reblog':
				return 'reblog';
			default:
				return null;
		}
	}
</script>

<div class="row">
	<div class="col-sm-6">
		<h6>
			{#if type === 'status'}
				<Icon icon="chat-left-text" />
			{:else if type === 'reblog'}
				<Icon icon="repeat" />
			{/if}
			<a href="edit/{type}/{id}">{title}</a>
		</h6>
	</div>
	<div class="col-sm-6">
		<div class="row">
			<div class="col-5">{visibility}</div>
			{#if visibility === 'published'}
				<div class="col-5">{publishTimestamp}</div>
				<div class="col-2">
					<a href={fullPermalink} class="btn btn-sm btn-outline-secondary">View</a>
				</div>
			{/if}
		</div>
	</div>
</div>
