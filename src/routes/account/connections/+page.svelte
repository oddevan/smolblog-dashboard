<script lang="ts">
	import { PUBLIC_DASHBOARD_URL } from "$env/static/public";
	import type { PageData } from "./$types";

	export let data: PageData;

	const returnTo = `${PUBLIC_DASHBOARD_URL}/account/connections`;
</script>

<p>Hello!</p>