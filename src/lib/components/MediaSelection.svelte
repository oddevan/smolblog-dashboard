<script lang="ts">
	import type { SmolblogSiteApiClient } from "$lib/smolblog/types";
	import { Cross, Upload } from "./Icons";
	import MediaForm from "./MediaForm.svelte";
	import { onMount, type SvelteComponent } from 'svelte';

	// Stores
	import { Paginator, ProgressBar, Tab, TabGroup, getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	// Form Data
	const formData = {
		name: 'Jane Doe',
		tel: '214-555-1234',
		email: 'jdoe@email.com'
	};

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

	let siteApi: SmolblogSiteApiClient = $modalStore[0].meta.siteApi;
	let currentTab: 'select'|'upload' = 'select';
	let paginationSettings = {
		page: 0,
		limit: 24,
		size: 0,
		amounts: [24],
	};

	const getContent = (page: number, limit: number) => siteApi.media.list(page, limit).then(res => res.content);

	onMount(() => siteApi.media.list(1, 1).then(res => paginationSettings.size = res.count));
</script>

{#if $modalStore[0]}
	<div class="modal-example-form card p-4 w-modal shadow-xl space-y-4">
		<header class="text-2xl font-bold">Select Media</header>
		<TabGroup>
			<Tab bind:group={currentTab} name="tab1" value="select">
				<svelte:fragment slot="lead">(icon)</svelte:fragment>
				<span>Select</span>
			</Tab>
			<Tab bind:group={currentTab} name="tab2" value="upload">
				<svelte:fragment slot="lead"><Upload/></svelte:fragment>
				<span>Upload new</span>
			</Tab>

			<svelte:fragment slot="panel">
				{#if currentTab === 'select'}
					{#await getContent(paginationSettings.page + 1, paginationSettings.limit)}
						<ProgressBar meter="bg-primary-900-50-token" track="bg-primary-200-700-token" />
					{:then mediaList}
						<div class="my-3 grid grid-cols-2 gap-2 sm:!grid-cols-4 overflow-y-auto">
							{#each mediaList ?? [] as media}
								<button on:click={() => console.log(media)}>
									<img src={media.thumbnailUrl} alt={media.title} class="w-full h-auto">
								</button>
							{/each}
						</div>
					{/await}
					
					<Paginator
						bind:settings={paginationSettings}
						showFirstLastButtons={false}
						showPreviousNextButtons={true}
					/>
				{:else if currentTab === 'upload'}
					<MediaForm {siteApi} />
				{/if}
			</svelte:fragment>
		</TabGroup>
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Submit Form</button>
    </footer>
	</div>
{/if}