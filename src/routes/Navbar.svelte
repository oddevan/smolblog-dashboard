<script lang="ts">
	import Icon from "../lib/components/Icon.svelte";
</script>

<nav class="navbar navbar-expand bg-body-tertiary" id="main-nav">
	<div class="container-fluid">
		<button class="btn btn-secondary d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
			<Icon icon="three-dots-vertical"/>
			Menu
		</button>
		<a class="navbar-brand d-none d-lg-block me-auto" href="/">
			<img src="/smolblog.wordmark.onwhite.svg" class="d-inline-block align-top" alt="Smolblog"
				style="width: auto; height: 30px">
		</a>
		<button class="btn btn-primary">
			<Icon icon="journal-plus"/>
			New
		</button>
		<ul class="navbar-nav">
			<li class="nav-item dropdown">
				<a title="My account" class="nav-link dropdown-toggle active" href="#" role="button"
					data-bs-toggle="dropdown" aria-expanded="false">
					<img src="https://picsum.photos/50" width="24" height="24" alt="My Account" style="margin:0;padding:0">
				</a>
				<ul class="dropdown-menu dropdown-menu-end">
					<li><span class="dropdown-item-text text-muted">Logged in as oddevan</span></li>
					<li><a class="dropdown-item" href="/account">Profile</a></li>
					<li><a class="dropdown-item" href="/account/security">Security</a></li>
					<li><a class="dropdown-item" href="/account/connections">Connections</a></li>
					<li>
						<hr class="dropdown-divider">
					</li>
					<li><a class="dropdown-item" href="#">Log Out</a></li>
				</ul>
			</li>
		</ul>
	</div>
</nav>