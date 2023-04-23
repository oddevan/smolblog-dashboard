import type { SmolblogFetch } from "./types";

export async function getUrlEmbed(fetcher: SmolblogFetch, url: string) {
	function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
	}
	await timeout(3000);

	return '<blockquote>Hello hello hello</blockquote>';
}

export async function getMarkdown(fetcher: SmolblogFetch, markdown: string) {
	function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
	}
	await timeout(500);

	return '<p>Sometimes things take a <em>while.</em></p><p>Sometimes <strong>no one</strong> gets it.</p><p>Then there\'s me. <a href="https://www.dropout.tv/game-changer">I\'ve been here the whole time.</a></p>';
}