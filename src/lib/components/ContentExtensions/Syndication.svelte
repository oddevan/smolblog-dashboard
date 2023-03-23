<script lang="ts">
	import Icon from "../Icon.svelte";

	export let value: string[] = [];

</script>
<div class="form-check form-switch syndication">
	<input class="form-check-input" type="checkbox" bind:group={value} value="54efb59e-5bb1-46bd-940e-cd764172d5c6" role="switch" id="syndicateTwitter">
	<label class="form-check-label" for="syndicateTwitter">
		<Icon icon="twitter"/> @oddevan
	</label>
</div>
<div class="form-check form-switch syndication">
	<input class="form-check-input" type="checkbox" bind:group={value} value="96530d6d-1a5a-43c6-a618-a1309608a23d" role="switch" id="syndicateYouTube">
	<label class="form-check-label" for="syndicateYouTube">
		<Icon icon="youtube"/> Evan Hildreth
	</label>
</div>
<div class="form-check form-switch syndication">
	<input class="form-check-input" type="checkbox" bind:group={value} value="43dcdbbe-7a65-4e0e-b2c8-e53ddee3d5be" role="switch" id="syndicateMastodon">
	<label class="form-check-label" for="syndicateMastodon">
		<Icon icon="mastodon"/> @oddevan@mastodon.social
	</label>
</div>