<script>
// @ts-nocheck
import * as Icons from '$lib/components/Icons';
</script>

<div class="p-4">
	<h2 class="h2 mb-4">Icons</h2>
	<div class="logo-cloud grid-cols-1 sm:!grid-cols-3 lg:!grid-cols-4 gap-4">
	{#each Object.keys(Icons) as iconName }
		<span class="logo-item">
			<span><svelte:component this={Icons[iconName]} size="large" /></span>
			<span>{iconName}</span>
		</span>
	{/each}
	</div>
</div>