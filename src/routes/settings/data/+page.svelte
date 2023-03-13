<script>
	import Breadcrumbs from "../../../lib/components/Breadcrumbs.svelte";

	const steps = [
		{path: '/', title: 'Dashboard'},
		{path: '/settings', title: 'Settings'},
	];

</script>

<Breadcrumbs steps={steps} current="Data" />

<h1>Data</h1>

