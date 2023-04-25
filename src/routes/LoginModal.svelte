<script lang="ts">
	import ErrorBox from "$lib/components/Error.svelte";
import Loading from "$lib/components/Loading.svelte";
import SmolblogLogo from "$lib/components/SmolblogLogo.svelte";
	import Smolblog from "$lib/smolblog";
	import type { SmolblogStore } from "$lib/stores/context";
	import { getContext, onMount } from "svelte";

	const context = getContext<SmolblogStore>('smolblog');

	let newBase: string;
	onMount(() => newBase = $context?.apiBase);

	const checkServer = async (apiBase: string) => {
		if (!apiBase) { throw new Error("Please enter a server."); }

		const smol = new Smolblog({ apiBase });
		return smol.server.info();
	};
</script>

<style>
	.modal-header {
		justify-content: center;
	}
	.modal-title {
		line-height: 30px;
		text-align: center;
	}
</style>

<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
  Launch login modal
</button>

<div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="loginModal" tabindex="-1" aria-describedby="loginModalTitle">
	<div class="modal-dialog modal-fullscreen-sm-down modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title" id="loginModalTitle">
					<SmolblogLogo height={30} />
					<span class="visually-hidden">Smolblog Dashboard Login</span>
				</h1>
      </div>
      <div class="modal-body">
        <input type="url" bind:value={newBase}>
				{#await checkServer(newBase)}
					<Loading/>
				{:then res} 
					<div class="alert alert-success" role="alert">
						Connected to {res?.version}
					</div>
				{:catch err}
					<ErrorBox error={err} />
				{/await}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-link">Help</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Connect to Smolblog</button>
      </div>
    </div>
	</div>
</div>