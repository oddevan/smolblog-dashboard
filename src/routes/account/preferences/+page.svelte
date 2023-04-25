<script lang="ts">
	import { getContext } from "svelte";
	import Theme from "./Theme.svelte";
	import type { DashboardThemeStore } from "$lib/stores/theme";

	const activeTheme = getContext<DashboardThemeStore>('theme');
</script>

<div class="row">
	<div class="col-sm">
		<button on:click={() => activeTheme.setUserPref('auto')} type="button" class="btn btn-primary">Apply</button>
	</div>
	<div class="col-sm">
		<h4>Match device settings</h4>
	</div>
</div>

<div class="row">
	<div class="col-sm">
		<button on:click={() => activeTheme.setUserPref('light')} type="button" class="btn btn-primary">Apply</button>
	</div>
	<div class="col-sm">
		<Theme key="light" title="Light mode" />
	</div>
</div>

<div class="row">
	<div class="col-sm">
		<button on:click={() => activeTheme.setUserPref('dark')} type="button" class="btn btn-primary">Apply</button>
	</div>
	<div class="col-sm">
		<Theme key="dark" title="Dark mode" />
	</div>
</div>