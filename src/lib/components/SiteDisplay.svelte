<script lang="ts">
	import { Avatar, Card } from 'flowbite-svelte';
	import type { Site } from '$lib/smolblog/types';

	export let site: Site;

	const siteServer = new URL(site.baseUrl).hostname;
</script>

<Card href="/site/{site.handle}" horizontal padding="none" class={$$props.class}>
	<div class="flex items-center p-3 overflow-hidden space-x-4">
		<Avatar rounded>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z"
				/>
			</svg>
		</Avatar>
		<div class="space-y-1 font-medium dark:text-white">
			<div class="truncate">{site.displayName}</div>
			<div class="text-sm secondary-text">{siteServer}</div>
		</div>
	</div>
</Card>
