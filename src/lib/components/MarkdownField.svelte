<script lang="ts">
	import context from '$lib/stores/context';
	import { createTextareaAutosize } from '@grail-ui/svelte';
	import Icon from "./Icon.svelte";
	import Loading from './Loading.svelte';

	const { useTextareaAutosize } = createTextareaAutosize();

	let showPreview = false;
	let previewHtml = '';
	let previewHeight = '1px';
	let previewLoading = false;

  let timer: NodeJS.Timeout | undefined;

  $: value && debouncedPreview()

  function debouncedPreview() {
    clearTimeout(timer)
    timer = setTimeout(updatePreview, 500)
  }

  async function updatePreview() {
		previewLoading = true;
		previewHtml = await $context.site?.preview.markdown(value) ?? '';
		previewLoading = false;
  }
	
	let mdTextarea: HTMLElement|null = null;

	export let placeholder = 'Write something...';
	export let value = '';
	export let identifier: string;

	const togglePreview = () => {
		if (!showPreview) {
			previewHeight = `${mdTextarea?.offsetHeight ?? 1}px`;
		}
		showPreview = !showPreview;
	};
</script>

<style lang="scss">
	.markdown-field {
		border: 1px solid var(--bs-secondary-bg);
		padding: .5em;
	}

	.md-preview {
		overflow-y: auto;
	}

	.md-toolbar {
		text-align: end;
	}

	.md-info {
		padding-right: 1em;
	}
</style>

<div class="mb-3 markdown-field">
	<div class="md-container">
		{#if showPreview}
		<div class="md-preview card" style:height={previewHeight} id={`${identifier}Preview`}>
			<div class="card-body">
				{#if previewLoading}
					<Loading/>
				{:else}
					{@html previewHtml}
				{/if}
			</div>
		</div>
		{:else}
		<label for={`${identifier}Body`} class="form-label visually-hidden">What's going on?</label>
		<textarea
			use:useTextareaAutosize
			class="form-control md-textarea"
			rows={3}
			id={`${identifier}Body`}
			{placeholder}
			bind:value
			bind:this={mdTextarea}
		/>
		{/if}
	</div>
	<div class="md-toolbar text-body-tertiary">
		<span class="md-info">_<em>emphasis</em>_</span>
		<span class="md-info">**<strong>strong</strong>**</span>
		<span class="md-info">[<a href="https://smol.blog/">link</a>](https://smol.blog/)</span>
		<button class="btn btn-sm" class:btn-primary={showPreview} class:btn-link={!showPreview} data-bs-toggle="button" on:click={togglePreview}>Preview</button>
		<Icon icon="markdown"/>
	</div>
</div>
