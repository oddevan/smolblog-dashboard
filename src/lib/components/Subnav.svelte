<script lang="ts">
	import type { BreadcrumbStep } from "./Breadcrumbs.svelte";
	import { page } from '$app/stores';

	export let items: BreadcrumbStep[]|undefined = undefined;
</script>

<style lang="postcss">
	.activeTab {
		@apply text-primary-600 border-primary-600 dark:text-primary-500 dark:border-primary-500;
	}
</style>

{#if items && items.length > 0}
<div class="mb-5 overflow-x-scroll text-sm font-medium text-center text-gray-500 dark:text-gray-400">
	<ul class="flex flex-wrap -mb-px space-x-2">
		{#each items as item}
		{@const { path, title } = item}
		<li>
			<a
				href={path}
				class="inline-block p-2 border-b-6 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300border-gray-500 dark:border-gray-600"
				class:activeTab={$page.url.pathname === path}
				aria-current={$page.url.pathname === path ? 'page' : undefined}
			>{title}</a>
		</li>
		{/each}
	</ul>
</div>
{/if}