import type { SmolblogFetch, NewStatusPayload, NewReblogPayload } from "./types";

export async function createStatus(fetcher: SmolblogFetch, siteId: string, payload: NewStatusPayload) {
	const { text, publish } = payload;

	await fetcher({
		endpoint: `/site/${siteId}/content/status/new`,
		payload: { text, publish }
	});

	return true;
}

export async function createReblog(fetcher: SmolblogFetch, siteId: string, payload: NewReblogPayload) {
	const { url, comment, publish } = payload;

	await fetcher({
		endpoint: `/site/${siteId}/content/reblog/new`,
		payload: { url, comment, publish }
	});

	return true;
}