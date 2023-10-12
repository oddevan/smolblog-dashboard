<script lang="ts">
	import ConnectionType from "$lib/components/ConnectionType.svelte";
	import ToggleSwitch from "$lib/components/ToggleSwitch.svelte";
	import type { PageData } from "./$types";
	import ChannelRow from "./ChannelRow.svelte";

	export let data: PageData;
</script>

<style lang="postcss">
	.table tbody :global(td) {
		@apply align-middle py-2 px-1;

		&:first-child {
			@apply ps-3;
		}
	}
</style>

<div class="table-container">
	<table class="table table-hover">
		<thead>
			<tr>
				<th colspan="2">Channel</th>
				<th>Push</th>
				<th>Pull</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each data.channels ?? [] as channel (channel.id)}
			<ChannelRow {channel} siteId={data.site?.id ?? ''} context={data.context} />
			{/each}
		</tbody>
	</table>
</div>
