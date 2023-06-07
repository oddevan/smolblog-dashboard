<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	const { currentSite } = data;
	const { handle } = currentSite ?? {};
</script>

<slot />
