export type ContentType = 'Status' | 'Reblog';

export interface ConnectorConnection {
	id: string;
	userId: string;
	provider: string;
	providerKey: string;
	displayName: string;
	channels: ConnectorChannel[];
}

export interface ConnectorChannel {
	id: string;
	channelKey: string;
	displayName: string;
	connectionProvider?: string;
	connectionName?: string;
}

export interface ConnectorChannelPlusLink extends ConnectorChannel {
	canPull: boolean;
	canPush: boolean;
}

export interface Site {
	id: string;
	handle: string;
	displayName: string;
	baseUrl: string;
}

export interface SiteSettingsPayload {
	id?: string;
	title: string;
	tagline: string;
}

export interface UserProfile {
	id: string;
	email: string;
	handle: string;
	displayName?: string;
	pronouns?: string;
}

export interface UserAndPermissions {
	user: UserProfile;
	isAdmin: boolean;
	isAuthor: boolean;
}

export interface SetUserProfilePayload {
	handle?: string;
	displayName?: string;
	pronouns?: string;
}

export type SmolblogFetch = (args: {
	endpoint: string;
	verb?: string;
	payload?: unknown;
}) => Promise<unknown>;

export interface NewStatusPayload {
	text: string;
	publish: boolean;
}

export interface NewReblogPayload {
	url: string;
	comment?: string;
	publish: boolean;
}

export interface Content {
	id: string;
	title: string;
	body: string;
	siteId: string;
	authorId: string;
	permalink?: string;
	publishTimestamp?: Date;
	visibility: 'draft' | 'private' | 'published';
	type: object;
	extensions: { [x: string]: object };
}
