<script lang="ts">
	import { Picture, Refresh, Status } from "$lib/components/Icons";

</script>
<div class="logo-cloud grid-cols-1 sm:!grid-cols-3 gap-4">
	<button class="logo-item">
		<span><Status size="large" /></span>
		<span>Note</span>
	</button>
	<button class="logo-item">
		<span><Refresh size="large" /></span>
		<span>Reblog</span>
	</button>
	<button class="logo-item">
		<span><Picture size="large" /></span>
		<span>Picture</span>
	</button>
</div>