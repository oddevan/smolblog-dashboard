<script lang="ts">
	import type { DashboardThemeStore } from "$lib/stores/theme";
	import { getContext, onMount } from "svelte";

	const theme = getContext<DashboardThemeStore>('theme');

	export let height = 30;
	let logoVariant = 'onwhite';

	onMount(() => {
		return theme.subscribe((themeVal => {
			switch (themeVal.currentTheme()) {
				case 'dark':
					logoVariant = 'ondark';
					break;
			
				default:
					logoVariant = 'onwhite';
					break;
			}
		}));
	});
</script>

<img
	src="/smolblog.wordmark.{logoVariant}.svg"
	class="d-inline-block align-top"
	alt="Smolblog"
	style="width: auto; height: {height}px"
>
