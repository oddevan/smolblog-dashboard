<script lang="ts">
	import Form, { type FormField, type FormSetter } from "$lib/components/Forms/Form.svelte";
	import Smolblog from "$lib/smolblog";
	import SidebarFrame from "../../SidebarFrame.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
	const api = data.context && data.currentSite ? new Smolblog(data.context) : undefined;

	function wrapSetter(setter?: FormSetter): FormSetter|undefined {
		if (!setter) { return undefined; }
		return (payload) => setter(payload).then(() => window.location.href += '/content');
	}

	const statusFormDefinition: FormField[] = [
    {
      name: 'text',
      label: 'What\'s going on?',
      type: 'markdown',
      required: true,
    },
    {
      name: 'publish',
      label: 'Publish Now',
      type: 'switch',
    },
	];
	const statusSetter = wrapSetter(api?.site(data.currentSite?.id ?? '').content.status.create);

	const reblogFormDefinition: FormField[] = [
    {
      name: 'url',
      label: 'URL to reblog',
      type: 'text',
      required: true,
    },
    {
      name: 'comment',
      label: 'Anything to add?',
      type: 'markdown',
    },
    {
      name: 'publish',
      label: 'Publish Now',
      type: 'switch',
    },
	];
	const reblogSetter = wrapSetter(api?.site(data.currentSite?.id ?? '').content.reblog.create);

</script>

<SidebarFrame site={data.currentSite}>

	<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
		<li class="nav-item" role="presentation">
			<button class="nav-link active" id="pills-status-tab" data-bs-toggle="pill" data-bs-target="#pills-status" type="button" role="tab" aria-controls="pills-status" aria-selected="true">New Status</button>
		</li>
		<li class="nav-item" role="presentation">
			<button class="nav-link" id="pills-reblog-tab" data-bs-toggle="pill" data-bs-target="#pills-reblog" type="button" role="tab" aria-controls="pills-reblog" aria-selected="false">New Reblog</button>
		</li>
	</ul>
	<div class="tab-content" id="pills-tabContent">
		<div class="tab-pane fade show active" id="pills-status" role="tabpanel" aria-labelledby="pills-status-tab" tabindex="0">
			<Form definition={statusFormDefinition} initialData={{ publish: true }} setter={statusSetter} />
		</div>
		<div class="tab-pane fade" id="pills-reblog" role="tabpanel" aria-labelledby="pills-reblog-tab" tabindex="0">
			<Form definition={reblogFormDefinition} initialData={{ publish: true }} setter={reblogSetter} />
		</div>
	</div>

</SidebarFrame>
