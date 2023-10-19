import type { FormField } from "$lib/components/FormFields";

export interface SmolblogContext {
	token: string | null;
};

export interface SmolblogApiClient {
	server: SmolblogServerApiClient;
	user: SmolblogUserApiClient;
	site: (id?: string) => SmolblogSiteApiClient|null;
};

export interface SmolblogServerApiClient {
	info: () => Promise<Server>;
};

export interface SmolblogUserApiClient {
	me: () => Promise<User>;
	sites: () => Promise<Site[]>;
	setProfile: (payload: UserSetProfilePayload) => Promise<void>;
	connections: () => Promise<ConnectorConnection[]>;
	initConnection: (provider: string, returnTo: string) => Promise<string>;
	connection: (id: string) => {
		refresh: () => Promise<ConnectorConnection>,
		delete: () => Promise<void>,
	};
};

export interface SmolblogSiteApiClient {
	setChannel: (channelId: string, push: boolean, pull: boolean) => Promise<void>
	channels: (admin?: boolean) => Promise<ConnectorChannelPlusLink[]>
	config: { content: () => Promise<SiteConfigContent> }
	content: { list: (page?: number, pageSize?: number) => Promise<{count: number, content: Content[]}>}
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

export type ConnectorChannelPlusLink = ConnectorChannel & { canPush: boolean, canPull: boolean }

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

export type Content = {
	id: string,
	siteId: string,
	authorId: string,
	permalink?: string,
	publishTimestamp?: Date,
	visibility: 'draft'|'published',
	title: string,
	body: string,
	contentType: ContentType,
  extensions: Record<string, unknown>,
}

export interface ContentType {
	title: string,
	body: string,
	type: string,
}
