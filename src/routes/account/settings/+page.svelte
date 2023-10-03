<script>
	import { PUBLIC_SERVER_URL } from "$env/static/public";
	import ArrowOut from "$lib/components/Icons/ArrowOut.svelte";

</script>
<h2 class="h2 mb-4">Account Settings</h2>

<a href="{PUBLIC_SERVER_URL}/wp-admin/profile.php" class="btn btn-md variant-filled-primary">
	<span><ArrowOut /></span>
	<span>Edit on WordPress dashboard</span>
</a>