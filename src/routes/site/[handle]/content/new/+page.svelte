<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
</script>

<a class="btn btn-primary" href="new/status">
	<Icon icon="chat-square-text" /> Status
</a>

<a class="btn btn-primary" href="new/reblog">
	<Icon icon="repeat" /> Reblog
</a>

<style lang="scss">
	a {
		display: inline-block;
		font-size: 3em;
		padding: 0.5em;
	}
</style>
