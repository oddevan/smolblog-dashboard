import { smolFetch, type FetchFunction } from '.';
import type { Server } from './types';

export default function smolblogServer(fetcher: FetchFunction) {
	return {
		info: () => smolFetch({ endpoint: '/hello' }, fetcher) as Promise<Server>
	};
}
