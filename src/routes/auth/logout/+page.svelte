<script lang="ts">
	import { goto } from "$app/navigation";
	import { localStorageStore } from "@skeletonlabs/skeleton";

	const store = localStorageStore<{ token: string|null }>('smolContext', { token: null });
	store.set({ token: null });

	goto('/auth/login');
</script>