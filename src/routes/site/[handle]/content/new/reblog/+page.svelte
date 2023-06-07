<script lang="ts">
	import Error from '$lib/components/ErrorBox.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import MarkdownField from '$lib/components/MarkdownField.svelte';
	import context from '$lib/stores/context';
	import ContentForm from '../../ContentForm.svelte';

	let meta: any = {};
	let extensions: any = {};

	let url = '';
	let comment = '';
</script>

<ContentForm
	bind:meta
	bind:extensions
	onCancel={() => {}}
	onSave={() => {}}
	onPublish={() => console.log({ url, comment, meta, extensions })}
>
	<div class="mb-3">
		<label for="urlInput" class="form-label">Reblog URL</label>
		<input
			type="url"
			class="form-control"
			id="urlInput"
			placeholder="Link to something cool..."
			bind:value={url}
		/>
	</div>
	<div id="reblogPreview" class="mb-3">
		{#if url && $context?.site}
			{#await $context.site.preview.embed(url)}
				<Loading />
			{:then embedCode}
				<iframe srcdoc={embedCode} title="Embed Preview" sandbox="" width="100%" />
			{:catch e}
				<Error error={e} />
			{/await}
		{:else}
			<span>Enter a URL to preview it here.</span>
		{/if}
	</div>
	<MarkdownField
		identifier="status"
		placeholder="Add to the conversation (optional)"
		bind:value={comment}
	/>
</ContentForm>

<style lang="scss">
	#reblogPreview {
		height: 200px;
		overflow: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bs-secondary-bg);
	}
</style>
