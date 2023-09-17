export interface SmolblogContext {
	token: string|null,
}

export interface SmolblogApiClient {
	user: SmolblogUserApiClient,
	site: (id: string) => SmolblogSiteApiClient,
}

export interface SmolblogUserApiClient {
	me: () => Promise<User>,
	sites: () => Promise<Site[]>,
}

export interface User {
	id: string,
	handle: string,
	displayName: string,
	email: string,
}

export interface Site {
	id: string,
	handle: string,
	displayName: string,
	baseUrl: string,
	description: string,
	publicKey: string,
}