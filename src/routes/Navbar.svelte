<script lang="ts">
	import Icon from "$lib/components/Icon.svelte";
	import SmolblogLogo from "$lib/components/SmolblogLogo.svelte";
	import type { SmolblogStore } from "$lib/stores/context";
	import { getContext } from "svelte";
	import { onMount } from "svelte";

	const context = getContext<SmolblogStore>('smolblog');

	let displayName: string;
	onMount(() => context.subscribe(async api => {
		if (!api.user) { return; }
		const profile = await api.user.profile.get();

		displayName = profile.displayName ?? profile.handle;
	}));
</script>

<nav class="navbar navbar-expand bg-body-tertiary" id="main-nav">
	<div class="container-fluid">
		<button class="btn btn-secondary d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
			<Icon icon="three-dots-vertical"/>
			Menu
		</button>
		<a class="navbar-brand d-none d-lg-block me-auto" href="/">
			<SmolblogLogo />
		</a>
		<ul class="navbar-nav">
			{#if $context?.site}
			<li class="nav-item dropdown">
				<button class="btn btn-link nav-link dropdown-toggle active"
					data-bs-toggle="dropdown" aria-expanded="false">
					<Icon icon="journal-plus"/>
					New
				</button>
				<ul class="dropdown-menu dropdown-menu-end">
					<li><a class="dropdown-item" href="/content/new/status">Status</a></li>
					<li><a class="dropdown-item" href="/content/new/reblog">Reblog</a></li>
				</ul>
			</li>
			{/if}
			{#if $context?.user}
			<li class="nav-item dropdown">
				<button title="My account" class="btn btn-link nav-link dropdown-toggle active"
					data-bs-toggle="dropdown" aria-expanded="false">
					<img src="https://picsum.photos/50" width="24" height="24" alt="My Account" style="margin:0;padding:0">
				</button>
				<ul class="dropdown-menu dropdown-menu-end">
					<li><span class="dropdown-item-text text-muted">Logged in as {displayName}</span></li>
					<li><a class="dropdown-item" href="/account">Profile</a></li>
					<li><a class="dropdown-item" href="/account/security">Security</a></li>
					<li>
						<hr class="dropdown-divider">
					</li>
					<li><button class="dropdown-item" on:click={context.logout}>Log Out</button></li>
				</ul>
			</li>
			{/if}
		</ul>
	</div>
</nav>