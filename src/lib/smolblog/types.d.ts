export interface ConnectorConnection {
	id: string,
	userId: string,
	provider: string,
	providerKey: string,
	displayName: string,
	channels: ConnectorChannel[],
};

export interface ConnectorChannel {
	id: string,
	channelKey: string,
	displayName: string,
};

export interface Site {
	id: string,
	displayName: string,
};

export interface UserProfile {
	id: string,
	email: string,
	handle: string,
	displayName?: string,
	pronouns?: string,
};

export interface SetUserProfilePayload {
	handle?: string,
	displayName?: string,
	pronouns?: string,
};

export type SmolblogFetch = (args: {
	endpoint: string,
	verb?: string,
	payload?: BodyInit,
}) => Promise<unknown>;
