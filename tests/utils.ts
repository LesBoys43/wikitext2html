import {jQueryFactory} from 'jquery/factory';
import {JSDOM} from 'jsdom';

export function jqify(html: string): JQueryStatic {
	const window = (new JSDOM(html)).window;
	return jQueryFactory(window as unknown as Window);
}
