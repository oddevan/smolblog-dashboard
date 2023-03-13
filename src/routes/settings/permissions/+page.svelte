<script>
	import Breadcrumbs from "../../../lib/components/Breadcrumbs.svelte";

	const steps = [
		{path: '/', title: 'Dashboard'},
		{path: '/settings', title: 'Settings'},
	];

</script>

<Breadcrumbs steps={steps} current="Permissions" />

<h1>Permissions</h1>

