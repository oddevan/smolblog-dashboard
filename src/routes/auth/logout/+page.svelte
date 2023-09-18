<script lang="ts">
	import { goto, invalidate } from "$app/navigation";
	import { localStorageStore } from "@skeletonlabs/skeleton";

	const store = localStorageStore<{ token: string|null }>('smolContext', { token: null });
	store.set({ token: null });

	invalidate('/');
	goto('/auth/login');
</script>