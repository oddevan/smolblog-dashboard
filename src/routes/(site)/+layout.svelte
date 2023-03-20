<script lang="ts">
	import { goto } from "$app/navigation";
	import context from "$lib/stores/context";
	import { onMount } from "svelte";

	onMount(() => {
		if (!$context.site) {
			goto('/');
		}
	});
</script>

<slot/>