<script lang="ts">
	import Form, { type FormField } from "$lib/components/Forms/Form.svelte";

  const definition: FormField[] = [
    {
      name: 'siteId',
      label: 'Site ID',
      type: 'display',
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'tagline',
      label: 'Tagline',
      type: 'text',
      description: 'Short (quippy?) description of the site.',
      required: true,
    },
  ];

  const initialData = { siteId: 'b000b1e5-293c-4b6d-b41e-b2ae152e1483' }

</script>

<Form {definition} {initialData} />

<hr>

<form>
  <div class="row mb-4">
    <label for="inputId" class="col-lg-2 col-form-label">Site ID</label>
    <div class="col-lg">
      <input type="email" readonly class="form-control-plaintext" id="inputId" value="a280e68a-f6aa-43de-8c9b-bb3950ddd0e7">
    </div>
  </div>
  <div class="row mb-4">
    <label for="inputTitle" class="col-lg-2 col-form-label">Title</label>
    <div class="col-lg">
      <input type="text" class="form-control" id="inputTitle">
    </div>
  </div>
  <div class="row mb-4">
    <label for="inputTagline" class="col-lg-2 col-form-label">Tagline</label>
    <div class="col-lg">
      <input type="text" class="form-control" id="inputTagline" aria-describedby="inputTaglineHelp">
			<span class="form-text" id="inputTaglineHelp">Short (quippy?) description of the site.</span>
    </div>
  </div>
	<button class="btn btn-primary">Save</button>
</form>