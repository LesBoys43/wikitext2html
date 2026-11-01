import {runAllTransforms} from './transforms';

export type Options = {
	/**
	 * Strict mode | Controls behavior when a transform throws an error
	 *
	 * true (defaults): Throw it directly
	 * false: Skip this transform
	 */
	strict?: boolean;
};

const INITIAL_OPTIONS: Options = {strict: true};

/**
 * Render MediaWiki Wikitext to HTML
 *
 * @param {string} wikitext The wikitext to renderer
 * @param {Options} options Renderer options
 * @return {string} The rendered HTML
 */
export function wikitextToHtml(wikitext: string, options: Options = INITIAL_OPTIONS): string {
	options = {...INITIAL_OPTIONS, ...options};
	return runAllTransforms(wikitext, options.strict);
}
