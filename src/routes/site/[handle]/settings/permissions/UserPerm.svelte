<script lang="ts">
	import Form, { type FormField } from "$lib/components/Forms/Form.svelte";
	import type { UserAndPermissions } from "$lib/smolblog/types";

	const definition: FormField[] = [
    {
      name: 'id',
      label: 'Site ID',
      type: 'hidden',
    },
    {
      name: 'isAuthor',
      label: 'Author',
      type: 'switch',
			description: 'User can create content'
    },
    {
      name: 'isAdmin',
      label: 'Admin',
      type: 'switch',
			description: 'User can change site options'
    },
  ];

	export let line: UserAndPermissions;
	const { user, isAdmin, isAuthor } = line;
</script>

<div class="row">
	<div class="col-sm-6">
		{user.displayName} ({user.handle})
	</div>
	<div class="col-sm-6">
		<Form
			type="line"
			{definition}
			initialData={{ id: user.id, isAdmin, isAuthor }}
			setter={async payload => console.log({payload})}
		/>
	</div>
</div>