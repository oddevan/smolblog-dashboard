<script>
	import Breadcrumbs from "../../lib/components/Breadcrumbs.svelte";

	const steps = [
		{path: '/', title: 'Dashboard'},
		{path: '/reader', title: 'Reader'},
	];

</script>

<Breadcrumbs steps={steps} current="Unread" />

<h1>Unread</h1>

