<script lang="ts">
	import { goto } from "$app/navigation";
	import context from "$lib/stores/context";
	import { onMount } from "svelte";

	onMount(() => {
		// TODO: get them out of the content areas if a site isn't set,
		//       but wait until after context is loaded from local storage!
		// if (!$context.site) {
		// 	goto('/');
		// }
	});
</script>

<slot/>