<script lang="ts" context="module">
	export interface BreadcrumbStep {
		path: string,
		title: string,
	};
</script>

<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";

	export let steps: BreadcrumbStep[];
	export let current: string;
</script>

<Breadcrumb aria-label="Breadcrumbs">
  <BreadcrumbItem href="/" home><span class="sr-only">Home</span></BreadcrumbItem>
	{#each steps as { path, title }}
  <BreadcrumbItem href={path}>{title}</BreadcrumbItem>
	{/each }
  <BreadcrumbItem>{current}</BreadcrumbItem>
</Breadcrumb>