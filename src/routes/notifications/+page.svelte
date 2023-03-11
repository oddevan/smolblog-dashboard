<script>
	import Breadcrumbs from "../../lib/components/Breadcrumbs.svelte";

	const steps = [
		{path: '/', title: 'Dashboard'},
		{path: '/notifications', title: 'Notifications'},
	];

</script>

<style>
	.filter-box {
		max-width: 200px;
	}
</style>

<Breadcrumbs steps={steps} current="Inbox" />

<h1>Inbox</h1>

<div class="row">
	<div class="col-sm order-sm-2">
		<div class="card filter-box">
			<h4 class="card-header">Filters</h4>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
				<label class="form-check-label" for="flexCheckDefault">
					Default checkbox
				</label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
				<label class="form-check-label" for="flexCheckChecked">
					Checked checkbox
				</label>
			</div>
		</div>
	</div>

	<div class="col-sm order-sm-1">
		<div class="card mb-3">
			<div class="card-body">
				<h5 class="card-title">Direct message from @altbot@bots.social</h5>
				<p class="card-text">Don't forget to add alt text to your pictures!</p>
			</div>
		</div>
		<div class="card mb-3">
			<div class="card-body">
				<h5 class="card-title">Mentioned by oddevan.com</h5>
				<p class="card-text">This is not a good idea.</p>
			</div>
		</div>
	</div>
</div>