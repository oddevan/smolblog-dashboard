<script lang="ts">
	import SveltyPicker from 'svelty-picker';
	import Icon from "$lib/components/Icon.svelte";
	import MarkdownField from "$lib/components/MarkdownField.svelte";


	let mdVal = `Sometimes things take a _while._

Sometimes **no one** gets it.

Then there's me. [I've been here the whole time.](https://www.dropout.tv/game-changer)`;

	let setTime = false;
	let pubDate: string|undefined;
</script>

<style lang="scss">
	
</style>

<form>
<div class="row">
	<div class="col-sm content-main">
		<MarkdownField identifier="status" placeholder="What's happening?" bind:value={mdVal}/>
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
						<div class="mb-3 btn-group">
							<input type="radio" class="btn-check" bind:group={setTime} value={false} id="setTimeNow" autocomplete="off" checked>
							<label class="btn btn-outline-primary btn-sm" for="setTimeNow">Publish Now</label>

							<input type="radio" class="btn-check" bind:group={setTime} value={true} id="setTimeLater" autocomplete="off">
							<label class="btn btn-outline-primary btn-sm" for="setTimeLater">Set a Time</label>
						</div>
						{#if setTime}
							<div class="mb-3">
								<label for="publishTimePicker" class="form-label">Publish time</label>
								<SveltyPicker inputClasses="form-control" format="yyyy-mm-dd hh:ii" bind:value={pubDate}></SveltyPicker>
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
</form>