<script lang="ts">
	import { page } from "$app/stores";
	import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
</script>

{#if $page.data.breadcrumbs.length > 0}
<Breadcrumbs steps={$page.data.breadcrumbs} current={$page.data.title} />
{/if}

<h1 class="my-3 font-bold text-3xl sm:text-4xl md:text-5xl text-black dark:text-white grow">{$page.data.title}</h1>