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
	content: {
		list: (page?: number, pageSize?: number) => Promise<{count: number, content: Content[]}>,
		drafts: () => Promise<Content[]>,
		get: (id: string) => Promise<ContentPayload>,
		new: (payload: ContentPayload) => Promise<{id: string}>,
		edit: (payload: ContentPayload) => Promise<void>,
		delete: (id: string) => Promise<void>,
	},
	media: {
		list: (page?: number, pageSize?: number) => Promise<{count: number, content: Media[]}>,
		get: (id: string) => Promise<Media>,
		new: (payload: FormData) => Promise<{id: string}>,
		edit: (id: string, payload: {title?: string, accessibilityText?: string}) => Promise<void>,
		delete: (id: string) => Promise<void>,
	}
	settings: {
		get: () => Promise<SiteSettingsPayload>,
		set: (payload: SiteSettingsPayload) => Promise<void>,
	},
	users: () => Promise<UserAndPermissions[]>,
	setPermission: (payload: SitePermissionPayload) => Promise<void>
};

export type Server = {
	serverVersion: string;
	specHref: string;
	license: {
		notice?: string;
		key: string;
		href: string;
		source?: Record<string, string>;
	}
};

export type User = {
	id: string;
	handle: string;
	displayName: string;
	email: string;
	features: string[];
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
	base: FormField[],
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

export interface ContentPayload {
	id?: string,
	type: ContentType,
	meta: ContentMeta,
	extensions: Record<string, Record<string, unknown>>,
	published: boolean,
}

export interface ContentType {
	[x: string]: unknown;
	type: string,
}

export interface ContentMeta {
	authorId: string,
	permalink?: string,
	publishTimestamp?: string,
}

export interface Media {
	id: string,
	userId: string,
	siteId: string,
	title: string,
	accessibilityText: string,
	type: 'image'|'video'|'audio'|'file',
	thumbnailUrl: string,
	defaultUrl: string,
}

export type SiteSettingsPayload = {
	id?: string;
	title?: string;
	tagline?: string;
}

export type UserAndPermissions = {
	user: User;
	isAdmin: boolean;
	isAuthor: boolean;
}

export type SitePermissionPayload = {
	userId: string;
	isAuthor: boolean;
	isAdmin: boolean
}