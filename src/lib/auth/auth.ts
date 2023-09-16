import { PUBLIC_SERVER_URL, PUBLIC_DASHBOARD_URL } from '$env/static/public';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { generateCodeChallenge, generateRandomString } from './pkce';
import { get } from 'svelte/store';

interface AuthState {
	state: string,
	challenge: string,
}

const authEndpoint = `${PUBLIC_SERVER_URL}/wp-json/indieauth/1.0/auth`;
const tokenEndpoint = `${PUBLIC_SERVER_URL}/wp-json/indieauth/1.0/token`;

const baseAuthRequestOptions = {
	response_type: 'code',
	client_id: PUBLIC_DASHBOARD_URL,
	redirect_uri: `${PUBLIC_DASHBOARD_URL}/auth/callback`,
	code_challenge_method: 'S256',
	scope: 'profile create update delete',
};

const baseTokenRequestOptions = {
	grant_type: 'authorization_code',
	client_id: PUBLIC_DASHBOARD_URL,
	redirect_uri: `${PUBLIC_DASHBOARD_URL}/auth/callback`,
}

function getStateStore() {
	return localStorageStore('smolAuthState', {
		state: '',
		challenge: '',
	});
}

function setAuthState(authState: AuthState) {
	getStateStore().set(authState);
}

function getAuthState() {
	return get(getStateStore());
}

export async function getAuthUrl() {
	const authState = {
		state: crypto.randomUUID(),
		challenge: generateRandomString(Math.floor(Math.random() * 85) + 43)
	};
	setAuthState(authState);

	const params = new URLSearchParams({
		...baseAuthRequestOptions,
		state: authState.state,
		code_challenge: await generateCodeChallenge(authState.challenge)
	});

	return `${authEndpoint}?${params.toString()}`;
}

export async function getToken(code: string, state: string, fetch = window.fetch): Promise<string> {
	const authState = getAuthState();
	if (state !== authState.state) {
		throw new Error("Incorrect auth state; please try again.");
	}

	console.log({authState});

	const params = new URLSearchParams({
		...baseTokenRequestOptions,
		code,
		code_verifier: authState.challenge
	});

	console.log({params});

	const response = await fetch(tokenEndpoint, {
		method: 'POST',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		body: params.toString(),
	}).then(res => res.json());

	console.log({response});

	return response.access_token;
}