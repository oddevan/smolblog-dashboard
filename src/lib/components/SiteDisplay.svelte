<script lang="ts">
	import { Avatar, Card } from 'flowbite-svelte';
	import type { Site } from '$lib/smolblog/types';
	import { Site as SiteIcon } from './Icons';

	export let site: Site;

	const siteServer = new URL(site.baseUrl).hostname;
</script>

<Card href="/site/{site.handle}" horizontal padding="none" class={$$props.class}>
	<div class="flex items-center p-3 overflow-hidden space-x-4">
		<Avatar rounded>
			<SiteIcon />
		</Avatar>
		<div class="space-y-1 font-medium dark:text-white">
			<div class="truncate">{site.displayName}</div>
			<div class="text-sm secondary-text">{siteServer}</div>
		</div>
	</div>
</Card>
