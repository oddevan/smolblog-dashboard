<script lang="ts">
	import type { PageData } from "./$types";
	import smolblog from "$lib/smolblog";
	import BasicForm from "$lib/components/Forms/BasicForm.svelte";
	import type { FormField } from "$lib/components/FormFields";
	import { Avatar } from "@skeletonlabs/skeleton";
	import { MD5 } from "crypto-js";

	export let data: PageData;

	const api = smolblog(data.context);
	const submitFunc = api.site(data.site?.id)?.setPermission;

	const definition: FormField[] = [
		{
			name: 'title',
			label: 'Title',
			type: 'text',
			required: true,
			description: 'Used as the profile name in some social apps.'
		},
		{
			name: 'tagline',
			label: 'Tagline',
			type: 'text',
			description: 'A short slogan.'
		},
	];
</script>

<h2 class="h2">Manage Users</h2>

<div class="table-container my-3">
	<table class="table table-hover">
		<thead>
			<tr>
				<th class="table-cell-fit"></th>
				<th>Name</th>
				<th>Handle</th>
				<th>Admin</th>
			</tr>
		</thead>
		<tbody>
			{#each data.users ?? [] as userLine (userLine.user.id)}
			{@const { user: { handle, displayName, email }, isAdmin } = userLine}
			<tr>
				<td class="table-cell-fit">
					<Avatar
						initials="SB"
						src={`https://www.gravatar.com/avatar/${MD5(email)}.jpg?s=48&d=mp`}
						width="w-10"
					/>
				</td>
				<td>{displayName}</td>
				<td>{handle}</td>
				<td>
					{isAdmin ? 'Yes' : 'No'}
				</td>
			</tr>
			{/each}
		</tbody>
	</table>
</div>

