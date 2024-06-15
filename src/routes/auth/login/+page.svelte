<script lang="ts">
	import { getAuthUrl } from '$lib/auth/auth';
	import { getLocalStateStore } from '$lib/auth/store';
	import Snek from '$lib/components/Icons/Snek.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	function startLogin() {
		getAuthUrl(getLocalStateStore())
			.then((url) => (window.location.href = url))
			.catch((e) => console.error(e));
	}
</script>

<h1 class="h1">Welcome to Smolblog</h1>
<Button on:click={startLogin} variant="default">
	<Snek class="mr-2" />
	Sign in with Smolblog
</Button>
<p><a href="https://smolblog.com/">What is Smolblog?</a></p>
