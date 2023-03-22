<script lang="ts">
	import Icon from "$lib/components/Icon.svelte";
	import SveltyPicker from 'svelty-picker';

	let setTime = false;
	let pubDate: string|undefined;

	let author = '73c0ebcd-3450-4e2b-bffa-45d4836d8ca1';

	let useSlug: string[] = [];
	let slug: string|undefined;

	export let meta: {
		publishDate?: string,
		author?: string,
		slug?: string,
	} = {
		publishDate: undefined,
		author: undefined,
		slug: undefined,
	};
	export let extensions: any = {};

	$: meta = {
		publishDate: setTime ? pubDate : undefined,
		author: author,
		slug: useSlug.length > 0 ? slug : undefined,
	};

	$: console.log({useSlug, slug});
</script>

<div class="card">
<form>
	<div class="card-body">
	<div class="row">
		<div class="col-sm content-main">
			<slot/>
		</div>
		<div class="col-sm content-extensions">
			<div class="accordion" id="accordionFlushExample">
				<div class="accordion-item">
					<h2 class="accordion-header" id="headingOne">
						<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
							Content Metadata
						</button>
					</h2>
					<div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionFlushExample">
						<div class="accordion-body">
							<div class="btn-group">
								<input type="radio" class="btn-check" bind:group={setTime} value={false} id="setTimeNow" autocomplete="off" checked>
								<label class="btn btn-outline-primary btn-sm" for="setTimeNow">Publish Now</label>
	
								<input type="radio" class="btn-check" bind:group={setTime} value={true} id="setTimeLater" autocomplete="off">
								<label class="btn btn-outline-primary btn-sm" for="setTimeLater">Set a Time</label>
							</div>
							{#if setTime}
								<div class="mt-2">
									<label for="publishTimePicker" class="form-label">Publish time</label>
									<SveltyPicker inputClasses="form-control" format="yyyy-mm-dd hh:ii" bind:value={pubDate}></SveltyPicker>
								</div>
							{/if}
	
							<div class="mt-3">
								<label for="authorPicker" class="form-label">Author</label>
								<select class="form-select form-select-sm" id="authorPicker" bind:value={author}>
									<option value="73c0ebcd-3450-4e2b-bffa-45d4836d8ca1" selected>oddEvan</option>
									<option value="57439bdf-7bc3-4fcc-8949-3c407d6e519c">Leroy Glover</option>
									<option value="f95e74cb-ff95-48fb-91dc-83c60fcd3a4f">Smolblog Staff</option>
								</select>
							</div>

							<div class="mt-3">
								<div class="form-check form-switch syndication">
									<input class="form-check-input" type="checkbox" role="switch" id="useSlugSwitch" bind:group={useSlug}>
									<label class="form-check-label" for="useSlugSwitch">
										Use Custom Slug
									</label>
								</div>
							</div>
							{#if useSlug.length > 0}
								<div class="mt-2">
									<input class="form-control form-control-sm" aria-label="Custom slug" placeholder="Custom slug" type="text" bind:value={slug}>
								</div>
							{/if}
						</div>
					</div>
				</div>
				<div class="accordion-item">
					<h2 class="accordion-header" id="flush-headingTwo">
						<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
							Tags
						</button>
					</h2>
					<div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
						<div class="accordion-body">
							<label for="tagEntry" class="form-label visually-hidden">Add tag</label>
							<input class="form-control form-control-sm" type="text" placeholder="Add tag" on:change={() => {}}>
							<span class="badge text-bg-primary">omg kitties</span>
							<span class="badge text-bg-primary">no but for real tho</span>
						</div>
					</div>
				</div>
				<div class="accordion-item">
					<h2 class="accordion-header" id="flush-headingThree">
						<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
							Syndication
						</button>
					</h2>
					<div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
						<div class="accordion-body">
							<div class="form-check form-switch syndication">
								<input class="form-check-input" type="checkbox" role="switch" id="syndicateTwitter">
								<label class="form-check-label" for="syndicateTwitter">
									<Icon icon="twitter"/> @oddevan
								</label>
							</div>
							<div class="form-check form-switch syndication">
								<input class="form-check-input" type="checkbox" role="switch" id="syndicateYouTube">
								<label class="form-check-label" for="syndicateYouTube">
									<Icon icon="youtube"/> Evan Hildreth
								</label>
							</div>
							<div class="form-check form-switch syndication">
								<input class="form-check-input" type="checkbox" role="switch" id="syndicateMastodon">
								<label class="form-check-label" for="syndicateMastodon">
									<Icon icon="mastodon"/> @oddevan@mastodon.social
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
		</div>
		<div class="card-footer">
			<button class="btn btn-danger">Cancel</button>
			<button class="btn btn-secondary">Save Draft</button>
			<button class="btn btn-primary">Publish</button>
		</div>
	</form>
	</div>