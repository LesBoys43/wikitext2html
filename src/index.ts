import {runAllTransforms} from './transforms';

export type LinkURLTemplateCallbackType = (pageName: string) => string;

export interface Options {
	/**
	 * Strict mode | Controls behavior when a transform throws an error
	 *
	 * true (defaults): Throw it directly
	 * false: Skip this transform
	 */
	strict?: boolean;
	/**
	 * Internal link URL template | URL builder for internal links
	 *
	 * This options defines how to construct href of <a> in HTML from page name
	 * of an internal link
	 *
	 * String - A string that contains $PAGE placeholder, this placeholder is
	 * URL-encoded page name, this string will be used as href
	 * Function - A function that receives raw page name, it should return
	 * href string
	 *
	 * "/index.php?title=$PAGE" (defaults): The default template, useful for
	 * real MediaWiki site
	 */
	linkURLTemplate?: string | LinkURLTemplateCallbackType;
}

const INITIAL_OPTIONS: Required<Options> = {
	strict: true,
	linkURLTemplate: '/index.php?title=$PAGE',
};

/**
 * Render MediaWiki Wikitext to HTML
 *
 * @param {string} wikitext The wikitext to renderer
 * @param {Options} options Renderer options
 * @return {string} The rendered HTML
 */
export function wikitextToHtml(wikitext: string, options: Options = INITIAL_OPTIONS): string {
	const mergedOptions = {...INITIAL_OPTIONS, ...options};
	return runAllTransforms(wikitext, mergedOptions.strict, mergedOptions);
}
