import type { FormField } from "$lib/components/FormFields";

export interface SmolblogContext {
	token: string | null;
};

export interface SmolblogApiClient {
	server: SmolblogServerApiClient;
	user: SmolblogUserApiClient;
	site: (id: string) => SmolblogSiteApiClient;
};

export interface SmolblogServerApiClient {
	info: () => Promise<Server>;
};

export interface SmolblogUserApiClient {
	me: () => Promise<User>;
	sites: () => Promise<Site[]>;
	setProfile: (payload: UserSetProfilePayload) => Promise<Record<string, never>>;
	connections: () => Promise<ConnectorConnection[]>;
	initConnection: (provider: string, returnTo: string) => Promise<string>;
	connection: (id: string) => {
		refresh: () => Promise<ConnectorConnection>,
		delete: () => Promise<Record<string, never>>,
	};
};

export interface SmolblogSiteApiClient {
	config: { content: () => Promise<SiteConfigContent> }
};

export type Server = {
	serverVersion: string;
	specHref: string;
};

export type User = {
	id: string;
	handle: string;
	displayName: string;
	email: string;
};

export type UserSetProfilePayload = {
	handle?: string,
	displayName?: string,
	pronouns?: string
};

export type ConnectorConnection = {
	id: string;
	userId: string;
	provider: string;
	providerKey: string;
	displayName: string;
	channels: ConnectorChannel[];
}

export type ConnectorChannel = {
	id: string;
	channelKey: string;
	displayName: string;
	connectionProvider?: string;
	connectionName?: string;
}

export type Site = {
	id: string;
	handle: string;
	displayName: string;
	baseUrl: string;
	description: string;
	publicKey: string;
};

export type SiteConfigContent = {
	types: Record<string, SiteConfigContentType>,
	extensions: Record<string, SiteConfigContentType>,
}

export type SiteConfigContentType = {
	key: string,
	name: string,
	formDefinition: FormField[],
}