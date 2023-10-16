import { smolFetch, type FetchFunction } from "..";
import type { Content, SmolblogContext } from "../types";

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
	}, fetcher) as { content: Content[] };

	return result.content.map(content => {
		const { publishTimestamp, contentType } = content;
		const actualType = 'originalTypeKey' in contentType ? contentType.originalTypeKey : contentType.type;
		const pubDate = publishTimestamp ? new Date(publishTimestamp) : null;
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