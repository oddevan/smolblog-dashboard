import type { UserProfile } from "$lib/smolblog/types";
import { writable } from "svelte/store";

export default writable<UserProfile>();