import { PUBLIC_SERVER_URL } from '$env/static/public';
import type { SmolblogApiClient, SmolblogContext } from "./types";
import smolblogUser from './user';

export default function smolblog(context: SmolblogContext): SmolblogApiClient {
	return {
		user: smolblogUser(context),
		site: (id: string) => id,
	};
}

export async function smolFetch(
	props: { endpoint: string; token?: string; verb?: string; payload?: unknown },
	fetcher = window.fetch,
): Promise<unknown> {
	const apiBase = `${PUBLIC_SERVER_URL}/wp-json/smolblog/v2`;

	const { endpoint, verb, payload, token } = props;
	const options: RequestInit = {};
	const headers: HeadersInit = {};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	if (payload) {
		options.body = JSON.stringify(payload);
		headers['Content-type'] = 'application/json';
	}

	options.method = verb ?? (payload ? 'POST' : 'GET');
	options.headers = headers;

	const response = await fetcher(`${apiBase}${endpoint}`, options);
	// Some valid responses are not valid JSON (a "No Content" response, for example).
	const responseData = await response.json().catch(() => {
		return {};
	});

	if (!response.ok) {
		throw new Error(
			`Error from Smolblog: ${responseData.error ?? response.status}`,
			responseData
		);
	}

	return responseData;
}