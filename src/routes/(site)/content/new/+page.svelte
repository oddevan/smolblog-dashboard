<script lang="ts">
	import MarkdownField from "$lib/components/MarkdownField.svelte";
	import ContentForm from '../ContentForm.svelte';


	let mdVal = `Sometimes things take a _while._

Sometimes **no one** gets it.

Then there's me. [I've been here the whole time.](https://www.dropout.tv/game-changer)`;

</script>

<style lang="scss">
	
</style>

<ContentForm>
	<MarkdownField identifier="status" placeholder="What's happening?" bind:value={mdVal}/>
</ContentForm>