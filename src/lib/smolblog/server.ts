import { smolFetch } from '.';
import type { Server } from './types';

export default function smolblogServer() {
	return {
		info: () => smolFetch({ endpoint: '/hello' }) as Promise<Server>
	};
}
