<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";
	import { localStorageStore } from "@skeletonlabs/skeleton";
	import { getToken } from "$lib/auth/auth";

	export let data: PageData;
	const { code, state } = data;

	let waiting = true;
	let authError: string|null = null;

	onMount(async () => {
		if (!code || !state) {
			goto('/auth/login');
			return;
		}

		try {
			const token = await getToken(code, state);

			const store = localStorageStore<{ token: string|null }>('smolContext', { token: null });
			store.set({ token });

			goto('/');
		} catch (error) {
			authError = (error instanceof Error) ? error.message : 'Something went wrong.';
		} finally {
			waiting = false;
		}
	});
</script>

{#if waiting}
<p>Logging in...</p>
{:else if authError}
<p>{authError} <a href="/auth/login">Try again</a></p>
{:else}
<p><a href="/">Back to the dashboard...</a></p>
{/if}