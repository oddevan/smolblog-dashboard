<script lang="ts">
	import Smolblog from '$lib/smolblog';
	import type { PageData } from './$types';

	export let data: PageData;
	const api = data.context && data.currentSite ? new Smolblog(data.context) : undefined;
</script>
