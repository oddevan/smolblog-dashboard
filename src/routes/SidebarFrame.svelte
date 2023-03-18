<script lang="ts">
	import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
	import Icon from "../lib/components/Icon.svelte";
	import SmolblogLogo from "../lib/components/SmolblogLogo.svelte";
  import { page } from '$app/stores';
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

			<button id="site-select-btn" type="button" class="btn btn-primary btn-block mb-3" data-bs-toggle="modal" data-bs-target="#siteSelectModal">
				<Icon icon="window-stack"/>
				Post Popular Mosts
			</button>

			<nav>
				<ul class="nav nav-pills flex-column" id="sidebar-nav">
					<li class="nav-item">
						<a class="nav-link" href="/"><Icon icon="speedometer2"/> Dashboard</a>
					</li>
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
					<li class="nav-item">
						<a class="nav-link" href="/account"><Icon icon="person"/> My Account</a>
						<slot name="account-nav"/>
					</li>
				</ul>
			</nav>

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

<div class="modal fade" id="siteSelectModal" tabindex="-1" aria-labelledby="siteSelectModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="siteSelectModalLabel">Select Site</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="list-group list-group-flush">
					<button class="list-group-item list-group-item-action" data-bs-dismiss="modal">Post Popular Mosts</button>
					<button class="list-group-item list-group-item-action" data-bs-dismiss="modal">oddEvan.com</button>
					<button class="list-group-item list-group-item-action" data-bs-dismiss="modal">madcrasher.com</button>
					<button class="list-group-item list-group-item-action" data-bs-dismiss="modal">The Nowhereverse</button>
					<button class="list-group-item list-group-item-action" data-bs-dismiss="modal">PillTimer</button>
				</div>
			</div>
		</div>
	</div>
</div>
