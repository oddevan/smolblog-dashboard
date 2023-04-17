<script lang="ts">
	import ErrorBox from "$lib/components/Error.svelte";
  import Loading from "$lib/components/Loading.svelte";
	import type { SetUserProfilePayload, UserProfile } from "$lib/smolblog/types";
  import context from "$lib/stores/context";
	import { onMount } from "svelte";
	import { load } from "../+page";

  let loading = true;
  let error: Error|undefined;
  let profile: UserProfile|undefined;
  let payload: SetUserProfilePayload|undefined;
  let initialPayload: SetUserProfilePayload|undefined;

  onMount(() => {
    context.subscribe(api => {
      if (api?.user) {
        api.user.profile.get()
          .then(res => {
            profile = res;
            loading = false;
            error = undefined;
            payload = {
              handle: profile.handle,
              displayName: profile.displayName,
              pronouns: profile.pronouns,
            };
            initialPayload = {...payload};
          }).catch(e => error = e);
      } else {
        loading = false;
        error = new Error('You must be logged in to access this page.');
      }
    });
  });

  const isValid: () => boolean = () => {
    return !!(
      payload && initialPayload &&
      (payload != initialPayload) &&
      (payload?.handle || initialPayload?.handle)
    );
  }

  const submit = async () => {
    if (payload) {
      console.log({payload});
      return await $context?.user?.profile.set(payload);
    }
    return false;
  }

</script>

{#if error}
  <ErrorBox {error}/>
{:else if profile && payload}
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
        <input type="email" readonly class="form-control-plaintext" id="inputEmail" value={profile.email}>
      </div>
    </div>
    <div class="row mb-4">
      <label for="inputHandle" class="col-lg-2 col-form-label">Handle</label>
      <div class="col-lg">
        <input type="text" readonly class="form-control-plaintext" id="inputHandle" aria-describedby="inputHandleHelp" bind:value={payload.handle}>
        <span class="form-text" id="inputHandleHelp">Unique name for you; used to log in.</span>
      </div>
    </div>
    <div class="row mb-4">
      <label for="inputName" class="col-lg-2 col-form-label">Name</label>
      <div class="col-lg">
        <input type="text" class="form-control" id="inputName" aria-describedby="inputNameHelp" bind:value={payload.displayName}>
        <span class="form-text" id="inputNameHelp">Name displayed to yourself and others.</span>
      </div>
    </div>
    <div class="row mb-4">
      <label for="inputPronouns" class="col-lg-2 col-form-label">Pronouns</label>
      <div class="col-lg">
        <input type="text" class="form-control" id="inputPronouns" aria-describedby="inputPronounsHelp" bind:value={payload.pronouns}>
        <span class="form-text" id="inputPronounsHelp">Optionaly indicate how you would like to be identified.</span>
      </div>
    </div>
    <button class="btn btn-primary" disabled={!isValid()} on:click={submit}>Save</button>
  </form>
{:else if loading}
  <Loading/>
{:else }
  <ErrorBox error={new Error('Something went very wrong...')}/>
{/if}