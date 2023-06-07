<script>
	import Icon from './Icon.svelte';
</script>

<div class="card reader-item">
	<div class="card-body">
		<p class="text-muted">@oddevan@mastodon.social</p>
		<h4 class="card-title">Item Title</h4>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu velit sit amet magna
			ullamcorper elementum ac eu arcu. Nulla tincidunt, sapien et gravida commodo, urna nunc
			pellentesque enim, id dapibus sem nunc vitae dui. Quisque malesuada nibh vel felis ullamcorper
			rutrum.
		</p>
	</div>
	<div class="card-footer">
		<button class="btn btn-primary" aria-label="Reply" title="Reply">
			<Icon icon="reply" />
		</button>
		<button class="btn btn-link" aria-label="Like" title="Like">
			<Icon icon="star" />
		</button>
		<button class="btn btn-link" aria-label="Bookmark" title="Bookmark">
			<Icon icon="bookmark-plus" />
		</button>
		<button class="btn btn-primary" aria-label="Reblog" title="Reblog">
			<Icon icon="repeat" />
		</button>
		<button class="btn btn-link" aria-label="Share" title="Share">
			<Icon icon="box-arrow-up" />
		</button>
	</div>
</div>
