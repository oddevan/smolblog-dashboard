<script lang="ts">
	export let value: string[] = [];
	let input = '';

	const onKeyPress = (e: KeyboardEvent) => {
		if (['Enter', ','].includes(e.key)) {
			e.preventDefault();
			e.stopPropagation();
			value = [...value, input];
			input = '';
		}
	};
</script>

<label for="tagEntry" class="form-label visually-hidden">Add tag</label>
<input
	class="form-control form-control-sm"
	type="text"
	placeholder="Add tag"
	bind:value={input}
	on:keydown={onKeyPress}
/>

{#each value as tag}
	<span class="badge text-bg-primary">{tag}</span>
{/each}
