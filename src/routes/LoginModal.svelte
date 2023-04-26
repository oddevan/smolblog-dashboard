<script lang="ts">
	import { PUBLIC_API_BASE } from "$env/static/public";
	import ErrorBox from "$lib/components/Error.svelte";
	import SmolblogLogo from "$lib/components/SmolblogLogo.svelte";
	import Smolblog from "$lib/smolblog";
	import type { SmolblogStore } from "$lib/stores/context";
	import { getContext, onMount } from "svelte";
	import type { Modal } from "bootstrap";

	const context = getContext<SmolblogStore>('smolblog');

	let modalElement: HTMLElement;
	let newBase: string;

	let modalController: Modal;

	onMount(async () => {
		newBase = $context?.apiBase ?? PUBLIC_API_BASE;

		const bootstrap = await import('bootstrap');
		modalController = bootstrap.Modal.getOrCreateInstance(modalElement);

		return context.subscribe(api => {
			if (!api.authHeader) {
				modalController.show();
			} else {
				modalController.hide();
			}
		});
	});

	let connected = false;
	let errored = false;

	const checkServer = async (apiBase: string) => {
		connected = false;
		errored = false;

		if (!apiBase) { return undefined; }

		try {
			new URL(apiBase, window.location.href);
			const info = await new Smolblog({ apiBase }).server.info();

			// If the url we're checking doesn't match the text input, ignore the result.
			if (newBase !== apiBase) { return; }

			// If we made it this far, we're good!
			connected = true;
			return info as { serverVersion: string, specHref: string };
		} catch (error) {
			// If the url we're checking doesn't match the text input, ignore the error.
			if (newBase !== apiBase) { return; }

			errored = true;
			throw error;
		}
	};

	let uname: string;
	let pass: string;
	let loginError: Error;

	const saveToContext = async () => {
		try {
			if (!modalElement || !connected || !uname || !pass) { return; }

			const authHeader = `Basic ${btoa(`${uname}:${pass}`)}`;
			context.initWithContext({ apiBase: newBase, authHeader });

			modalController.hide();
		} catch (error) {
			loginError = error as Error;
		}
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

<div
	class="modal fade"
	data-bs-backdrop="static"
	data-bs-keyboard="false"
	id="loginModal"
	tabindex="-1"
	aria-describedby="loginModalTitle"
	bind:this={modalElement}
>
	<div class="modal-dialog modal-fullscreen-sm-down modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title" id="loginModalTitle">
					<SmolblogLogo height={30} />
					<span class="visually-hidden">Smolblog Dashboard Login</span>
				</h1>
      </div>
      <div class="modal-body">
				<div class="mb-4">
					<label for="inputServer">Server</label>
					<input
						type="url"
						class="form-control"
						id="inputServer"
						aria-describedby="helpServer"
						bind:value={newBase}
						class:is-invalid={errored}
						class:is-valid={connected}
					>
					<span
						class="form-text placeholder-wave"
						id="helpServer"
						class:invalid-feedback={errored}
						class:valid-feedback={connected}
					>
						{#await checkServer(newBase)}
							<span class="placeholder col-12"></span>
						{:then res}
							{#if res}
								Connected to Smolblog {res.serverVersion}.
							{:else}
								Enter a Smolblog server to connect to.
							{/if}
						{:catch err}
							{err.message ?? 'Could not connect to server.'}
						{/await}
					</span>
				</div>

				<div class="mb-3">
					<label for="inputHandle" class="form-label">Username</label>
					<input type="text" disabled={!connected} class="form-control" id="inputHandle" placeholder="admin" bind:value={uname}>
				</div>
				<div class="mb-3">
					<label for="inputPassword" class="form-label">App Password</label>
					<input type="password" disabled={!connected} class="form-control" id="inputPassword" bind:value={pass}>
				</div>
				{#if loginError}
					<ErrorBox error={loginError}/>
				{/if}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" disabled={!connected} on:click={saveToContext}>
					Connect to Smolblog
				</button>
      </div>
    </div>
	</div>
</div>