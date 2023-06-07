<script lang="ts">
	import Form, { type FormSetter } from '$lib/components/Forms/Form.svelte';
	import type { FormField } from '$lib/components/Forms/Form.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import type { ConnectorChannelPlusLink } from '$lib/smolblog/types';

	const definition: FormField[] = [
		{
			name: 'channelId',
			label: 'Channel ID',
			type: 'hidden'
		},
		{
			name: 'push',
			label: 'Push',
			type: 'switch',
			description: 'Site can push content to this channel'
		},
		{
			name: 'pull',
			label: 'Pull',
			type: 'switch',
			description: 'Site can pull content from this channel'
		}
	];

	export let channel: ConnectorChannelPlusLink;
	export let setter: FormSetter | undefined;

	const { connectionProvider, connectionName, displayName, id, canPull, canPush } = channel;
</script>

<div class="row">
	<div class="col-sm-6">
		<Icon icon={connectionProvider} />
		{connectionName}:
		{displayName}
	</div>
	<div class="col-sm-6">
		<Form
			type="line"
			{definition}
			initialData={{ channelId: id, pull: canPull, push: canPush }}
			{setter}
		/>
	</div>
</div>
