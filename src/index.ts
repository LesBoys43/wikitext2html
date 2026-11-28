import {runAllTransforms} from './transforms';

export type LinkURLTemplateCallbackType = (pageName: string) => string;

export interface Options {
	/**
	 * Strict mode | Controls behavior when a transform throws an error
	 *
	 * true (default): Throw it directly
	 * false: Skip this transform
	 */
	strict?: boolean;
	/**
	 * Internal link URL template | URL builder for internal links
	 *
	 * This option defines how to construct the href of <a> in HTML from the
	 * page name of an internal link
	 *
	 * String - A string that contains the $PAGE placeholder. This placeholder
	 * is the URL-encoded page name. This string will be used as the href
	 * Function - A function that receives the raw page name. It should return
	 * the href string
	 *
	 * "/index.php?title=$PAGE" (default): The default template, useful for a
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
 * @param {string} wikitext The wikitext to render
 * @param {Options} options Renderer options
 * @return {string} The rendered HTML
 */
export function wikitextToHtml(wikitext: string, options: Options = INITIAL_OPTIONS): string {
	const mergedOptions = {...INITIAL_OPTIONS, ...options};
	return runAllTransforms(wikitext, mergedOptions.strict, mergedOptions);
}
