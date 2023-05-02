import { getMarkdown, getServerInfo, getUrlEmbed } from "./server";
import type { NewReblogPayload, NewStatusPayload, SetUserProfilePayload, SiteSettingsPayload, SmolblogFetch } from "./types";
import { getUserProfile, getUserSites, setUserProfile } from "./user";
import { startConnectionSession, getUserConnections, linkChannelAndSite, getSiteChannelsForAdmin } from "./connections";
import { getSiteSettings, getSiteUsers, setSitePermission, setSiteSettings } from "./site";
import { createReblog, createStatus } from "./status";

export interface SmolblogContext {
	apiBase: string,
	authHeader?: string,
}

export default class Smolblog {
	readonly apiBase: string;
	readonly authHeader?: string;

	readonly server: SmolblogServer;
	readonly user?: SmolblogUser;

	readonly fetch: SmolblogFetch;

	constructor(props: SmolblogContext, fetcher = fetch ) {
		const { apiBase, authHeader } = props;

		this.apiBase = apiBase;
		this.authHeader = authHeader;

		this.fetch = async (props: { endpoint: string, verb?: string, payload?: unknown }) => {
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
	
			options.method = verb ?? (payload ? 'POST' : 'GET');
			options.headers = headers;
	
			const response = await fetcher(`${this.apiBase}${endpoint}`, options);
			// Some valid responses are not valid JSON (a "No Content" response, for example).
			const responseData = await response.json().catch(() => { return {}; });
	
			if (!response.ok) {
				throw new Error(`Error from Smolblog: ${responseData.error ?? response.status}`, responseData);
			};
			
			return responseData;
		};

		this.server = new SmolblogServer(this.fetch);
		if (this.authHeader) { this.user = new SmolblogUser(this.fetch); }
	}

	get context(): SmolblogContext {
		return {
			apiBase: this.apiBase,
			authHeader: this.authHeader ?? undefined,
		};
	}

	site(siteId: string): SmolblogSite {
		return new SmolblogSite(this.fetch, siteId);
	}
}

class SmolblogServer {
	private fetcher: SmolblogFetch;

	constructor(fetcher: SmolblogFetch) {
		this.fetcher = fetcher;
	}

	info = () => getServerInfo(this.fetcher);
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
			create: (payload: NewStatusPayload) => createStatus(this.fetcher, this.siteId, payload),
			edit: () => console.error('Smolblog.site.content.status.edit not implemented.'),
			delete: () => console.error('Smolblog.site.content.status.delete not implemented.'),
		},
		reblog: {
			get: () => console.error('Smolblog.site.content.reblog.get not implemented.'),
			create: (payload: NewReblogPayload) => createReblog(this.fetcher, this.siteId, payload),
			edit: () => console.error('Smolblog.site.content.status.edit not implemented.'),
			delete: () => console.error('Smolblog.site.content.reblog.delete not implemented.'),
		}
	}
	settings = {
		general: {
			get: () => getSiteSettings(this.fetcher, this.siteId),
			set: (payload: SiteSettingsPayload) => setSiteSettings(this.fetcher, this.siteId, payload),
		},
		users: {
			get: () => getSiteUsers(this.fetcher, this.siteId),
			set: (payload: { userId: string, isAuthor: boolean, isAdmin: boolean }) =>
				setSitePermission(this.fetcher, this.siteId, payload),
		},
		channels: {
			get: () => getSiteChannelsForAdmin(this.fetcher, this.siteId),
			link: (payload: { channelId: string, push: boolean, pull: boolean }) =>
				linkChannelAndSite(this.fetcher, this.siteId, payload),
		}
	}
	preview = {
		embed: (url: string) => getUrlEmbed(this.fetcher, url),
		markdown: (markdown: string) => getMarkdown(this.fetcher, markdown),
	}
}