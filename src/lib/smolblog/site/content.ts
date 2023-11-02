import { smolFetch, type FetchFunction } from "..";
import type { Content, ContentPayload, Media, SmolblogContext } from "../types";

export async function getAvailableContent(
	siteId: string,
	context: SmolblogContext,
	fetcher: FetchFunction,
	pageSize: number,
	pageNumber: number,
) {
	const result = await smolFetch({
		endpoint: `/site/${siteId}/content?page=${pageNumber}&pageSize=${pageSize}`,
		token: context.token ?? undefined
	}, fetcher) as { count: number, content: Content[] };

	return {
		count: result.count,
		content: processContent(result.content),
	};
}

export async function getDrafts(
	siteId: string,
	context: SmolblogContext,
	fetcher: FetchFunction
) {
	const result = await smolFetch({
		endpoint: `/site/${siteId}/content?visibility=draft`,
		token: context.token ?? undefined
	}, fetcher) as { count: number, content: Content[] };

	return processContent(result.content);
}

export function getAvailableMedia(
	siteId: string,
	context: SmolblogContext,
	fetcher: FetchFunction,
	pageSize: number,
	pageNumber: number,
) {
	return smolFetch({
		endpoint: `/site/${siteId}/content/media?page=${pageNumber}&pageSize=${pageSize}`,
		token: context.token ?? undefined
	}, fetcher) as Promise<{ count: number, content: Media[] }>;
}

export async function getContent(
	contentId: string,
	siteId: string,
	context: SmolblogContext,
	fetcher: FetchFunction
) {
	return smolFetch({
		endpoint: `/site/${siteId}/content/${contentId}`,
		token: context.token ?? undefined
	}, fetcher) as Promise<ContentPayload>;
}

export function getMedia(
	mediaId: string,
	siteId: string,
	context: SmolblogContext,
	fetcher: FetchFunction
) {
	return smolFetch({
		endpoint: `/site/${siteId}/content/media/${mediaId}`,
		token: context.token ?? undefined
	}, fetcher) as Promise<Media>;
}

function processContent(contentArray: Content[]): Content[] {
	return contentArray.map(content => {
		const { publishTimestamp, contentType } = content;
		const actualType = 'originalTypeKey' in contentType ? contentType.originalTypeKey as string : contentType.type;
		const pubDate = publishTimestamp ? new Date(publishTimestamp) : undefined;
		return {
			...content,
			publishTimestamp: pubDate,
			contentType: {
				...contentType,
				type: actualType,
			}
		};
	});
}