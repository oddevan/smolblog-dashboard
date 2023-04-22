import { getMarkdown, getUrlEmbed } from "./server";
import type { SetUserProfilePayload, Site, SmolblogFetch } from "./types";
import { getUserProfile, getUserSites, setUserProfile } from "./user";
import { startConnectionSession, getUserConnections, linkChannelAndSite } from "./user/connections";

export interface SmolblogContext {
	apiBase: string,
	authHeader?: string,
	currentSite?: Site
}

export default class Smolblog {
	readonly apiBase: string;
	readonly authHeader?: string;
	readonly currentSite?: Site;

	readonly server: SmolblogServer;
	readonly user?: SmolblogUser;
	readonly site?: SmolblogSite;

	readonly fetch: SmolblogFetch;

	constructor(props: SmolblogContext) {
		const { apiBase, authHeader, currentSite } = props;

		this.apiBase = apiBase;
		this.authHeader = authHeader;
		this.currentSite = currentSite;

		this.fetch = async (props: { endpoint: string, verb?: string, payload?: BodyInit }) => {
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
			// Some valid responses are not valid JSON (a "No Content" response, for example).
			const responseData = await response.json().catch(() => { return {}; });
	
			if (!response.ok) {
				throw new Error(`Error from Smolblog: ${responseData.error ?? response.status}`, responseData);
			};
			
			return responseData;
		};

		this.server = new SmolblogServer(this.fetch);
		if (this.authHeader) { this.user = new SmolblogUser(this.fetch); }
		if (this.currentSite) { this.site = new SmolblogSite(this.fetch, this.currentSite.id); }
	}

	get context(): SmolblogContext {
		return {
			apiBase: this.apiBase,
			authHeader: this.authHeader ?? undefined,
			currentSite: this.currentSite ?? undefined,
		};
	}
}

class SmolblogServer {
	private fetcher: SmolblogFetch;

	constructor(fetcher: SmolblogFetch) {
		this.fetcher = fetcher;
	}

	info = async () => {
		return {
			version: '0.2.0',
			contact: {
				admin: 'admin@smol.blog',
				dmca: 'copyright@smol.blog',
			}
		}
	};
}

class SmolblogUser {
	private fetcher: SmolblogFetch;

	constructor(fetcher: SmolblogFetch) {
		this.fetcher = fetcher;
	}

	profile = {
		get: () => getUserProfile(this.fetcher),
		set: (payload: SetUserProfilePayload) => setUserProfile(this.fetcher, payload),
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
		init: (provider: string) => startConnectionSession(this.fetcher, provider),
		refresh: () => console.error('Smolblog.user.connections.refresh not implemented.'),
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
			link: (channelId: string, push: boolean, pull: boolean) =>
				linkChannelAndSite(this.fetcher, this.siteId, channelId, push, pull),
		}
	}
	preview = {
		embed: (url: string) => getUrlEmbed(this.fetcher, url),
		markdown: (markdown: string) => getMarkdown(this.fetcher, markdown),
	}
}