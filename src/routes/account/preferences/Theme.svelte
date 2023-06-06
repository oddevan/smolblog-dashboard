<script lang="ts">
	export let key: string;
	export let title: string;
</script>

<style>
	.swatch-bin {
		display: flex;
		width: 100%;
		height: 2em;
	}

	.swatch-bin span {
		display: block;
		flex-grow: 1;
	}
</style>

<div data-bs-theme={key} class="bg-body">
	<h4 class="text-body-emphasis">{title}</h4>
	<p class="text-body">Text and <a>link</a></p>
	<div class="swatch-bin" aria-hidden="true">
		<span class="bg-primary"></span>
		<span class="bg-secondary"></span>
		<span class="bg-body-secondary"></span>
		<span class="bg-body-tertiary"></span>
	</div>
</div>