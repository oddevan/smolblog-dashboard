<script lang="ts">
	import AccountSidebar from "$lib/components/AccountSidebar.svelte";
	import PageTitle from "$lib/components/PageTitle.svelte";
</script>

<div class="md:flex md:flex-row-reverse h-full w-full">
	<div class="w-full md:grow md:ml-3">
		<PageTitle/>

		<slot/>
	</div>
	<div class="w-full md:w-56">
		<AccountSidebar sidebarClass="w-full md:w-56"/>
	</div>
</div>