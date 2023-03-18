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
