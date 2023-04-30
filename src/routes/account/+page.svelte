<script lang="ts">
	import ErrorBox from "$lib/components/ErrorBox.svelte";
	import Form from "$lib/components/Forms/Form.svelte";
	import type { FormField } from "$lib/components/Forms/Form.svelte";
  import Loading from "$lib/components/Loading.svelte";
	import type { SetUserProfilePayload, UserProfile } from "$lib/smolblog/types";
	import type { SmolblogStore } from "$lib/stores/context";
	import { getContext, onMount } from "svelte";
	import type { PageData } from "./$types";
	import Smolblog from "$lib/smolblog";

  const definition: FormField[] = [
    {
      name: 'handle',
      label: 'Handle',
      type: 'text',
      description: 'Unique name for you; used to log in.',
      required: true
    },
    {
      name: 'displayName',
      label: 'Name',
      type: 'text',
      description: 'Name displayed to yourself and others.',
      required: true,
    },
    {
      name: 'pronouns',
      label: 'Pronouns',
      type: 'text',
      description: 'Optionaly indicate how you would like to be identified.',
    },
  ];

  export let data: PageData;
  const { context, initialData } = data;
  const api = context ? new Smolblog(context) : undefined;
</script>

<Form {definition} {initialData} setter={api?.user?.profile.set} />