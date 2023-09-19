<script lang="ts">
	import { getAuthUrl } from "$lib/auth/auth";
	import { getLocalStateStore } from "$lib/auth/store";
	import Snek from "$lib/components/Icons/Snek.svelte";

	function startLogin() {
		getAuthUrl(getLocalStateStore()).then(url => window.location.href = url).catch(e => console.error(e));
	}
</script>

<h1 class="h1">Welcome to Smolblog</h1>
<button on:click={startLogin} class="btn btn-lg variant-filled">
	<span><Snek size={8}/></span>
	<span>Sign in with Smolblog</span>
</button>
<p><a href="https://smolblog.com/">What is Smolblog?</a></p>