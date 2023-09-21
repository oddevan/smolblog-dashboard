export type SmolblogContext = {
	token: string|null,
}

export type SmolblogApiClient = {
	server: SmolblogServerApiClient,
	user: SmolblogUserApiClient,
	site: (id: string) => SmolblogSiteApiClient,
}

export type SmolblogServerApiClient = {
	info: () => Promise<Server>,
}

export type SmolblogUserApiClient = {
	me: () => Promise<User>,
	sites: () => Promise<Site[]>,
}

export type Server = {
	serverVersion: string,
	specHref: string,
}

export type User = {
	id: string,
	handle: string,
	displayName: string,
	email: string,
}

export type Site = {
	id: string,
	handle: string,
	displayName: string,
	baseUrl: string,
	description: string,
	publicKey: string,
}
