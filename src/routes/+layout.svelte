<script lang="ts">
	// Import our custom CSS
	import '$lib/scss/index.scss';
	import Icon from '../lib/components/Icon.svelte';
	import Navbar from './Navbar.svelte';

	// Import all of Bootstrap's JS
	// @ts-ignore
	import * as bootstrap from "bootstrap";
</script>

<Navbar/>

<slot/>