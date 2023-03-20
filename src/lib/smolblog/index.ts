import type { Site, SmolblogFetch } from "./types";
import { getUserConnections, getUserProfile, getUserSites } from "./user";

export default class Smolblog {
	readonly apiBase: string;
	readonly authHeader?: string;
	readonly currentSite?: Site;

	readonly server: SmolblogServer;
	readonly user?: SmolblogUser;
	readonly site?: SmolblogSite;

	constructor(apiBase: string, authHeader?: string, currentSite?: Site) {
		this.apiBase = apiBase;
		this.authHeader = authHeader;
		this.currentSite = currentSite;

		this.server = new SmolblogServer(this.fetch);
		if (this.authHeader) { this.user = new SmolblogUser(this.fetch); }
		if (this.currentSite) { this.site = new SmolblogSite(this.fetch, this.currentSite.id); }
	}

	async fetch(props: { endpoint: string, verb?: string, payload?: BodyInit }) {
		const { endpoint, verb, payload } = props;
		const options: RequestInit = {};
		const headers: HeadersInit = {};

		if (this.authHeader) {
			headers.Authorization = this.authHeader;
		}

		if (payload) {
			options.body = JSON.stringify(payload);
			headers['Content-type'] = 'application/json';
		}

		options.method = verb ?? payload ? 'POST' : 'GET';
		options.headers = headers;

		const response = await fetch(`${this.apiBase}${endpoint}`, options);
		const responseData = await response.json();

		if (!response.ok) {
			throw new Error(`Error from Smolblog: ${responseData.error ?? response.status}`, responseData);
		};
		
		return responseData;
	}
}

class SmolblogServer {
	private fetcher: SmolblogFetch;

	constructor(fetcher: SmolblogFetch) {
		this.fetcher = fetcher;
	}

	info = () => console.error('Smolblog.server.info not implemented.');
}

class SmolblogUser {
	private fetcher: SmolblogFetch;

	constructor(fetcher: SmolblogFetch) {
		this.fetcher = fetcher;
	}

	profile = {
		get: () => getUserProfile(this.fetcher),
		set: () => console.error('Smolblog.user.profile.set not implemented.'),
	}
	sites = {
		get: () => getUserSites(this.fetcher),
	}
	preferences = {
		get: () => console.error('Smolblog.user.preferences.get not implemented.'),
		set: () => console.error('Smolblog.user.preferences.set not implemented.'),
	}
	connections = {
		get: () => getUserConnections(this.fetcher),
		init: () => console.error('Smolblog.user.connections.init not implemented.'),
		refresh: () => console.error('Smolblog.user.connections.refresh not implemented.'),
		delete: () => console.error('Smolblog.user.connections.delete not implemented.'),
	}
}

class SmolblogSite {
	private fetcher: SmolblogFetch;
	private siteId: string;

	constructor(fetcher: SmolblogFetch, siteId: string) {
		this.fetcher = fetcher;
		this.siteId = siteId;
	}

	content = {
		all: () => console.error('Smolblog.site.content.all not implemented.'),
		status: {
			get: () => console.error('Smolblog.site.content.status.get not implemented.'),
			create: () => console.error('Smolblog.site.content.status.create not implemented.'),
			edit: () => console.error('Smolblog.site.content.status.edit not implemented.'),
			delete: () => console.error('Smolblog.site.content.status.delete not implemented.'),
		},
		reblog: {
			get: () => console.error('Smolblog.site.content.reblog.get not implemented.'),
			create: () => console.error('Smolblog.site.content.reblog.create not implemented.'),
			edit: () => console.error('Smolblog.site.content.status.edit not implemented.'),
			delete: () => console.error('Smolblog.site.content.reblog.delete not implemented.'),
		}
	}
	settings = {
		general: {
			get: () => console.error('Smolblog.site.settings.general.get not implemented.'),
			set: () => console.error('Smolblog.site.settings.general.set not implemented.'),
		},
		users: {
			get: () => console.error('Smolblog.site.settings.users.get not implemented.'),
			set: () => console.error('Smolblog.site.settings.users.set not implemented.'),
		},
		channels: {
			get: () => console.error('Smolblog.site.settings.channels.get not implemented.'),
			link: () => console.error('Smolblog.site.settings.channels.link not implemented.'),
		}
	}
	preview = {
		embed: () => console.error('Smolblog.site.preview.embed not implemented.'),
		markdown: () => console.error('Smolblog.site.preview.markdown not implemented.'),
	}
}