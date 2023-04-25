<script lang="ts">
	import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
	import Icon from "../lib/components/Icon.svelte";
	import SmolblogLogo from "../lib/components/SmolblogLogo.svelte";
  import { page } from '$app/stores';
	import SiteSelectModal from "./SiteSelectModal.svelte";
	import type { SmolblogStore } from "$lib/stores/context";
	import { getContext } from "svelte";

	const context = getContext<SmolblogStore>('smolblog');

	let serverVersion = '';
	$context?.server.info().then(({ version }) => serverVersion = version);
</script>

<div class="container-fluid mx-auto" style="min-height: 100%">
	<div class="row">
		<div class="col-lg offcanvas-lg offcanvas-start" tabindex="-1" id="sidebar" aria-labelledby="sidelineLabel">
			<div class="offcanvas-header">
				<h5 class="offcanvas-title" id="sidelineLabel">
					<SmolblogLogo height={30} />
				</h5>
				<button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebar"  aria-label="Close"></button>
			</div>

			<SiteSelectModal/>

			<nav>
				<ul class="nav nav-pills flex-column" id="sidebar-nav">
					<li class="nav-item">
						<a class="nav-link" href="/"><Icon icon="speedometer2"/> Dashboard</a>
					</li>
					{#if $context?.site}
					<!-- <li class="nav-item">
						<a class="nav-link" href="/reader"><Icon icon="newspaper"/> Reader</a>
						<slot name="reader-nav"/>
					</li> -->
					<li class="nav-item">
						<a class="nav-link" href="/content"><Icon icon="journal-richtext"/> Content</a>
						<slot name="content-nav"/>
					</li>
					<!-- <li class="nav-item">
						<a class="nav-link" href="/notifications"><Icon icon="bell"/> Notifications</a>
						<slot name="notifications-nav"/>
					</li> -->
					<li class="nav-item">
						<a class="nav-link" href="/settings"><Icon icon="gear"/> Settings</a>
						<slot name="settings-nav"/>
					</li>
					{/if}
					<li class="nav-item">
						<a class="nav-link" href="/account"><Icon icon="person"/> My Account</a>
						<slot name="account-nav"/>
					</li>
				</ul>
			</nav>

			<p class="mt-5 text-body-tertiary">Server version: {serverVersion}</p>

		</div>
		<div class="col-lg">
			{#if $page.data.breadcrumbs.length > 0}
			<Breadcrumbs steps={$page.data.breadcrumbs} current={$page.data.title} />
			{/if}
			<h1>{$page.data.title}</h1>
			<slot />
		</div>
	</div>
</div>
