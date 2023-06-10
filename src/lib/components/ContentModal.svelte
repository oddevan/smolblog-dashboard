<script lang="ts">
  import { Button, Modal } from 'flowbite-svelte'
	import Markdown from './FormFields/Markdown.svelte';

  export let show = false;
</script>

<style lang="postcss">
	.inner-modal :global(.mobile-modal-full) {
		@apply -mx-6 w-screen sm:mx-0 sm:w-full;
	}
</style>

<Modal title="New Note" bind:open={show} outsideclose class="-left-1 -mx-3 sm:mx-0 w-screen sm:w-full">
	<div class="inner-modal">
		<Markdown class="mobile-modal-full" definition={{
			name: 'text',
			label: "What's happening?",
			type: 'markdown',
		}} />
	</div>
	<p>I know what’s going on here. I know what’s going on here. Okay? I do. And if you want me to wander backstage to spill the beans... I’m the only one out of the loop, it would seem... and if we check my point total here— I don’t NEED to walk to the front, because I know what it is. It’s a big ol’ GOOSE EGG, GANG. It’s a FAT ZERO. HELLO!! A little LATE ADDITION to the numerical symbol chart brought to us from our friends in Arabia, a little bit of trivia that I happen to know about the history of numbers. That kind of little tidbit would serve me well in most trivia games, unless it had been RIGGED FROM THE BEGINNING! Oh, I’ve only just BEGUN to pull the thread on this sweater, friends. You would THINK in a game where there are only TWO possible correct choices, that one would STUMBLE INTO the right answer every so often, wouldn’t you? In fact, the probability of NEVER guessing right in the full game is a STATISTICAL WONDER, and yet, HERE WE ARE. Introduced at the top of the game as a champion, what do you think that means? Icarus, flying too close to the sun. But it seems Daedalus, our little master crafter over here, had some wax wings of his own, didn’t he? Wanted to see his son fall. Fall from the sky. Oh, how CLOSE TO THE SUN he flew! Well I’m NOT HAVING IT. I solved your labyrinth, puzzle master! The minotaur‘s escaped and you’re gonna get the horns, buddy!</p>
	<svelte:fragment slot='footer'>
		<Button on:click={() => show = false} color="red">Cancel</Button>
		<span class="grow"/>
		<Button color="alternative">Draft</Button>
		<Button on:click={() => alert('Handle "success"')}>Publish</Button>
	</svelte:fragment>
</Modal>