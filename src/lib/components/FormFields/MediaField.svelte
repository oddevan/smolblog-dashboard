<script lang="ts">
	import { ProgressBar, getModalStore } from '@skeletonlabs/skeleton';
	import { makeDefaultController, type FormField, type FieldController, type FormFieldProps } from '.';
	import BaseField from './BaseField.svelte';
	import type { Media } from '$lib/smolblog/types';
	import { AddMedia } from '../Icons';

	interface $$Props extends FormFieldProps {};

	const modalStore = getModalStore();

	export let definition: FormField;
	export let value: unknown = undefined;
	export let controller: FieldController<unknown> = makeDefaultController(definition, value);

	let typedController = controller as FieldController<string[]>;
	$typedController.value ??= [];

	let mediaCache: Record<string, Media> = {}
	const getMedia = async (id: string) => {
		if (!definition.attributes?.siteApi) {
			console.error('Cannot show media selection: no API object passed to MediaField.');
			return;
		}

		mediaCache[id] ??= await definition.attributes.siteApi.media.get(id);
		return mediaCache[id];
	};

	const showMediaModal = (index: number) => {
		if (!definition.attributes?.siteApi) {
			console.error('Cannot show media selection: no API object passed to MediaField.');
			return;
		}

		modalStore.trigger({
			type: 'component',
			component: 'mediaSelection',
			meta: { siteApi: definition.attributes.siteApi },
			response: (r: any) => {
				if (!r) return;
				$typedController.value[index] = r;
			}
		})
	};
</script>

<BaseField {definition} bind:value controller={typedController} let:helpText>
	<div class="btn-group-vertical variant-filled-primary">
		{#each $typedController.value as mediaId, index}
			<button on:click={() => showMediaModal(index)}>
				{#await getMedia(mediaId)}
					<ProgressBar meter="bg-primary-900-50-token" track="bg-primary-200-700-token" />
				{:then mediaObj} 
					<span>
						<img class="h-12 w-auto" src={mediaObj?.thumbnailUrl} alt={mediaObj?.accessibilityText}>
					</span>
					<span>
						{mediaObj?.title}
					</span>
				{/await}
			</button>
		{/each}
		{#if $typedController.value.length == 0 || definition.attributes?.multiple}
		<button on:click={() => showMediaModal($typedController.value.length)}>
			<span>
				<AddMedia/>
			</span>
			<span>Add media</span>
		</button>
		{/if}
	</div>
</BaseField>