// See https://kit.svelte.dev/docs/types#app

import type { BreadcrumbStep } from "$lib/components/Breadcrumbs.svelte";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			breadcrumbs: BreadcrumbStep[],
			subnav?: BreadcrumbStep[],
			title: string
		}
		// interface Platform {}
	}
}

export {};
