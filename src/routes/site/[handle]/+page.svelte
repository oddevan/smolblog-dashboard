<script lang="ts">
	import Markdown from '$lib/components/FormFields/Markdown.svelte';
	import Smolblog from '$lib/smolblog';
	import type { PageData } from './$types';

	export let data: PageData;
	const api = data.context && data.currentSite ? new Smolblog(data.context) : undefined;
</script>

<Markdown definition={{
	name: 'text',
	label: "What's happening?",
	type: 'markdown',
}}/>