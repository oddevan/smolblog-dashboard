<script lang="ts">
	import { goto } from "$app/navigation";
	import ContentForm from "$lib/components/ContentForm.svelte";
import ContentIcon from "$lib/components/ContentIcon.svelte";
	import smolblog from "$lib/smolblog";
	import type { PageData } from "./$types";

	export let data: PageData;
	$: siteApi = smolblog(data.context).site(data.site?.id);
</script>

<div class="grid grid-cols-1 md:!grid-cols-2">
	{#key data}
	<div class="px-4">
		{#if siteApi}
		<h3 class="h3 mb-4">Make something new</h3>
		<ContentForm {siteApi} closeFunction={() => goto(`/site/${data.site?.handle}/content`)} />
		{/if}
	</div>
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
