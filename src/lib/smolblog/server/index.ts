import type { SmolblogFetch } from "../types";

export async function getUrlEmbed(fetcher: SmolblogFetch, url: string) {
	function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
	}
	await timeout(3000);

	return '<blockquote>Hello hello hello</blockquote>';
}