<script lang="ts">
	import Syndication from '$lib/components/ContentExtensions/Syndication.svelte';
	import Tags from '$lib/components/ContentExtensions/Tags.svelte';
	import type { ComponentType } from 'svelte';
	import Flatpickr from 'svelte-flatpickr';
	import 'flatpickr/dist/flatpickr.css';

	const availableExtensions: Array<{
		type: string;
		displayName: string;
		component: ComponentType;
	}> = [
		{
			type: '\\Smolblog\\Core\\Content\\Extensions\\Tags',
			displayName: 'Tags',
			component: Tags
		},
		{
			type: '\\Smolblog\\Core\\Content\\Extensions\\Syndication',
			displayName: 'Syndication',
			component: Syndication
		}
	];

	let setTime = false;
	let pubDate: string | undefined;

	let author = '73c0ebcd-3450-4e2b-bffa-45d4836d8ca1';

	let useSlug: string[] = [];
	let slug: string | undefined;

	export let meta: {
		publishDate?: string;
		author?: string;
		slug?: string;
	} = {
		publishDate: undefined,
		author: undefined,
		slug: undefined
	};
	export let extensions: any = {};

	export let onCancel: (() => void) | undefined = undefined;
	export let onSave: (() => void) | undefined = undefined;
	export let onPublish: (() => void) | undefined = undefined;

	$: meta = {
		publishDate: setTime ? pubDate : undefined,
		author: author,
		slug: useSlug.length > 0 ? slug : undefined
	};
</script>

<div class="card">
	<form>
		<div class="card-body">
			<div class="row">
				<div class="col-sm content-main">
					<slot />
				</div>
				<div class="col-sm content-extensions">
					<div class="accordion" id="accordionFlushExample">
						<div class="accordion-item">
							<h2 class="accordion-header" id="headingOne">
								<button
									class="accordion-button"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target="#collapseOne"
									aria-expanded="true"
									aria-controls="collapseOne"
								>
									Content Metadata
								</button>
							</h2>
							<div
								id="collapseOne"
								class="accordion-collapse collapse show"
								aria-labelledby="headingOne"
								data-bs-parent="#accordionFlushExample"
							>
								<div class="accordion-body">
									<div class="btn-group">
										<input
											type="radio"
											class="btn-check"
											bind:group={setTime}
											value={false}
											id="setTimeNow"
											autocomplete="off"
											checked
										/>
										<label class="btn btn-outline-primary btn-sm" for="setTimeNow"
											>Publish Now</label
										>

										<input
											type="radio"
											class="btn-check"
											bind:group={setTime}
											value={true}
											id="setTimeLater"
											autocomplete="off"
										/>
										<label class="btn btn-outline-primary btn-sm" for="setTimeLater"
											>Set a Time</label
										>
									</div>
									{#if setTime}
										<div class="mt-2">
											<label for="publishTimePicker" class="form-label">Publish time</label>
											<Flatpickr options={{ enableTime: true }} bind:value={pubDate} />
										</div>
									{/if}

									<div class="mt-3">
										<label for="authorPicker" class="form-label">Author</label>
										<select
											class="form-select form-select-sm"
											id="authorPicker"
											bind:value={author}
										>
											<option value="73c0ebcd-3450-4e2b-bffa-45d4836d8ca1" selected>oddEvan</option>
											<option value="57439bdf-7bc3-4fcc-8949-3c407d6e519c">Leroy Glover</option>
											<option value="f95e74cb-ff95-48fb-91dc-83c60fcd3a4f">Smolblog Staff</option>
										</select>
									</div>

									<div class="mt-3">
										<div class="form-check form-switch syndication">
											<input
												class="form-check-input"
												type="checkbox"
												role="switch"
												id="useSlugSwitch"
												bind:group={useSlug}
											/>
											<label class="form-check-label" for="useSlugSwitch"> Use Custom Slug </label>
										</div>
									</div>
									{#if useSlug.length > 0}
										<div class="mt-2">
											<input
												class="form-control form-control-sm"
												aria-label="Custom slug"
												placeholder="Custom slug"
												type="text"
												bind:value={slug}
											/>
										</div>
									{/if}
								</div>
							</div>
						</div>
						{#each availableExtensions as extTemplate (extTemplate.type)}
							<div class="accordion-item">
								<h2 class="accordion-header" id={`${extTemplate.displayName}Heading`}>
									<button
										class="accordion-button collapsed"
										type="button"
										data-bs-toggle="collapse"
										data-bs-target={`#${extTemplate.displayName}Body`}
										aria-expanded="false"
										aria-controls={`${extTemplate.displayName}Body`}
									>
										{extTemplate.displayName}
									</button>
								</h2>
								<div
									id={`${extTemplate.displayName}Body`}
									class="accordion-collapse collapse"
									aria-labelledby={`${extTemplate.displayName}Heading`}
									data-bs-parent="#accordionFlushExample"
								>
									<div class="accordion-body">
										<svelte:component
											this={extTemplate.component}
											bind:value={extensions[extTemplate.type]}
										/>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
		<div class="card-footer d-flex">
			{#if onCancel}
				<button class="btn btn-outline-danger me-auto" on:click={onCancel}>Cancel</button>
			{/if}
			{#if onSave}
				<button class="btn btn-outline-secondary me-2" on:click={onSave}>Save Draft</button>
			{/if}
			{#if onPublish}
				<button class="btn btn-primary" on:click={onPublish}>Publish</button>
			{/if}
		</div>
	</form>
</div>
