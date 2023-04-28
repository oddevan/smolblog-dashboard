<script lang="ts">
	import type { Site } from "$lib/smolblog/types";

	export let site: Site;

	const siteServer = (new URL(site.baseUrl)).hostname;
</script>

{site.displayName}<br>
<small class="text-body-tertiary">{siteServer}</small>