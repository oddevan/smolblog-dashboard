<script lang="ts">
	import Error from "$lib/components/Error.svelte";
import Loading from "$lib/components/Loading.svelte";
import context from "$lib/stores/context";

</script>

{#await $context.user?.profile.get()}
  <Loading/>
{:then profile}
{#if profile}
  <form>
    <div class="row mb-4">
      <label for="inputId" class="col-lg-2 col-form-label">ID</label>
      <div class="col-lg">
        <input type="email" readonly class="form-control-plaintext" id="inputId" value={profile.id}>
      </div>
    </div>
    <div class="row mb-4">
      <label for="inputEmail" class="col-lg-2 col-form-label">Email</label>
      <div class="col-lg">
        <input type="email" class="form-control" id="inputEmail" value={profile.email}>
      </div>
    </div>
    <div class="row mb-4">
      <label for="inputHandle" class="col-lg-2 col-form-label">Handle</label>
      <div class="col-lg">
        <input type="text" class="form-control" id="inputHandle" aria-describedby="inputHandleHelp" value={profile.handle}>
        <span class="form-text" id="inputHandleHelp">Unique name for you; used to log in.</span>
      </div>
    </div>
    <div class="row mb-4">
      <label for="inputName" class="col-lg-2 col-form-label">Name</label>
      <div class="col-lg">
        <input type="text" class="form-control" id="inputName" aria-describedby="inputNameHelp" value={profile.displayName ?? ''}>
        <span class="form-text" id="inputNameHelp">Name displayed to yourself and others.</span>
      </div>
    </div>
    <div class="row mb-4">
      <label for="inputPronouns" class="col-lg-2 col-form-label">Pronouns</label>
      <div class="col-lg">
        <input type="text" class="form-control" id="inputPronouns" aria-describedby="inputPronounsHelp" value={profile.pronouns ?? ''}>
        <span class="form-text" id="inputPronounsHelp">Optionaly indicate how you would like to be identified.</span>
      </div>
    </div>
    <button class="btn btn-primary">Save</button>
  </form>
{/if}
{:catch error}
  <Error {error}/>
{/await}