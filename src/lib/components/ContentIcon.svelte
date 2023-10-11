<script lang="ts">
	import { Content, Status } from "./Icons";
	import type { IconProps } from "./Icons/BaseIcon.svelte";
	import Picture from "./Icons/Picture.svelte";
	import Reblog from "./Icons/Reblog.svelte";

	interface $$Props extends IconProps { type?: string };

	export let type: string|null = null;
</script>

{#if type == 'note'}
	<Status {...$$props} />
{:else if type == 'reblog'}
	<Reblog {...$$props} />
{:else if type == 'picture'}
	<Picture {...$$props} />
{:else}
	<Content {...$$props} />
{/if}