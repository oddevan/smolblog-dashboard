<script lang="ts" context="module">
	export interface BreadcrumbStep {
		path: string,
		title: string,
	};
</script>

<script lang="ts">
	export let steps: BreadcrumbStep[];
	export let current: string;
</script>

<nav aria-label="breadcrumb" id="breadcrumb-nav">
	<ol class="breadcrumb">
		{#each steps as { path, title }}
		<li class="breadcrumb-item"><a href="{path}">{title}</a></li>
		{/each }
		<li class="breadcrumb-item active" aria-current="page">{current}</li>
	</ol>
</nav>