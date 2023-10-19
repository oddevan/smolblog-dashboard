<script lang="ts">
	import ContentIcon from "$lib/components/ContentIcon.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div class="grid grid-cols-1 md:!grid-cols-2">
	<div class="px-4">
	<a href={`/site/${data.site?.handle ?? '0'}/new`} class="btn p-4 variant-filled w-full">
		Write something new
	</a>
</div>

{#key data}
<div class="list-nav card p-4">
	<h3 class="h3 mb-4">Drafts</h3>
	<ul>
		{#each data.drafts ?? [] as content (content.id)}
		<li>
			<a href={`/site/${data.site?.handle ?? '0'}/edit/${content.id}`} class="flex">
				<span><ContentIcon type={content.contentType.type} size="medium" class="me-2"/></span>
				<span class="flex-auto">{content.title}</span>
			</a>
		</li>
		{/each}
	</ul>
</div>
{/key}
</div>
