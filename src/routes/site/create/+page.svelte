<script lang="ts">
	import { goto } from "$app/navigation";
	import type { FormField } from "$lib/components/FormFields";
	import BasicForm from "$lib/components/Forms/BasicForm.svelte";
	import smolblog from "$lib/smolblog";
	import type { PageData } from "./$types";

	export let data: PageData;

	const regexer = /^[a-z0-9][-a-z0-9]*[a-z0-9]$/i;
	const definition: FormField[] = [
		{
			name: 'handle',
			label: 'Handle',
			type: 'text',
			description: 'Unique subdomain for this site.',
			required: true,
			validators: [
				{
					key: 'valid-subdomain',
					message: 'Field must be a valid subdomain',
					func: async (val) => typeof val === 'string' && regexer.test(val),
				}
			],
		},
		{
			name: 'displayName',
			label: 'Title',
			type: 'text',
			required: true,
		}
	];

	const onSubmit = async (payload: Record<string, unknown>) => {
		const { handle, displayName } = payload as {handle: string, displayName: string};
		const siteTools = smolblog(data.context).user.sites

		const siteId = await siteTools.new(handle.toLowerCase(), displayName);
		const allSites = await siteTools.list();
		const site = allSites.find(val => val.id == siteId);

		if (site) {
			goto(`/site/${site.handle}`, { invalidateAll: true });
		}
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="card variant-surface p-6">
		<h2 class="h2">Create a new site</h2>
		<BasicForm {definition} {onSubmit} />
	</div>
</div>