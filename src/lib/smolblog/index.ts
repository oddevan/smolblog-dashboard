import { PUBLIC_SERVER_URL } from '$env/static/public';
import smolblogServer from './server';
import smolblogSite from './site';
import type { SmolblogApiClient, SmolblogContext } from './types';
import smolblogUser from './user';

export type FetchFunction = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

export default function smolblog(context: SmolblogContext, fetcher: FetchFunction = window.fetch): SmolblogApiClient {
	return {
		server: smolblogServer(fetcher),
		user: smolblogUser(context, fetcher),
		site: (id?: string) => id ? smolblogSite(id, context, fetcher) : null,
	};
}

export async function smolFetch(
	props: { endpoint: string; token?: string; verb?: string; payload?: unknown, formData?: FormData },
	fetcher: FetchFunction,
): Promise<unknown> {
	const apiBase = `${PUBLIC_SERVER_URL}/wp-json/smolblog/v2`;

	const { endpoint, verb, payload, token, formData } = props;
	const options: RequestInit = {};
	const headers: HeadersInit = {};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	if (formData) {
		options.body = formData;
	} else if (payload) {
		options.body = JSON.stringify(payload);
		headers['Content-type'] = 'application/json';
	}

	options.method = verb ?? (payload || formData ? 'POST' : 'GET');
	options.headers = headers;

	const response = await fetcher(`${apiBase}${endpoint}`, options);
	// Some valid responses are not valid JSON (a "No Content" response, for example).
	const responseData = await response.json().catch(() => {
		return;
	});

	if (!response.ok) {
		throw new Error(`Error from Smolblog: ${responseData.error ?? response.status}`, { cause: responseData });
	}

	return responseData;
}
