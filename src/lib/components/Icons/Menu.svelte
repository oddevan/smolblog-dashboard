<script lang="ts">
	export let alt: string | undefined = undefined;
	export let size = 6;
	const nodeClass = $$props.class ?? `w-${size} h-${size}`;
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class={nodeClass}>
  <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
</svg>
{#if alt}<span class="sr-only">{alt}</span>{/if}
