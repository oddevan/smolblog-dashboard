<script lang="ts">
	import Icon from "./Icon.svelte";

	export let error: Error|undefined = undefined;
	export let message = error?.message ?? 'The operation could not be completed.';
</script>

<div class="alert alert-danger" role="alert">
  <Icon icon="exclamation-triangle-fill"/>
	{message}
</div>