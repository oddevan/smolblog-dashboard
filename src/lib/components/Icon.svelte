<script lang="ts">
	export let icon = '';
</script>

{#if icon === 'microblog'}
<img src="/microblog.png" alt="Micro.blog" style="width:auto;height:1em;">
{:else}
<svg class="bi" fill="currentColor">
	<use xlink:href="/bootstrap-icons.svg#{icon}" />
</svg>
{/if}