export interface SmolblogContext {
	token: string|null,
}

export interface SmolblogApiClient {
	server: SmolblogServerApiClient,
	user: SmolblogUserApiClient,
	site: (id: string) => SmolblogSiteApiClient,
}

export interface SmolblogServerApiClient {
	info: () => Promise<Server>,
}

export interface SmolblogUserApiClient {
	me: () => Promise<User>,
	sites: () => Promise<Site[]>,
}

export interface Server {
	serverVersion: string,
	specHref: string,
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