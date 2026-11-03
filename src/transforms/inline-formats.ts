type InlineFormat = {
	priority: number;
	fence: string;
	element: string | string[];
};

import {escapeForRegExp, fromLines, toLines} from '../utils';
import bold from './inlineFormats/bold';
import italic from './inlineFormats/italic';
import boldAndItalic from './inlineFormats/bold-and-italic';

const INLINE_FORMATS: InlineFormat[] = [
	bold,
	italic,
	boldAndItalic,
].sort(({priority: a}, {priority: b}) => b - a);

function buildElStr(el: string | string[]): {opening: string; closing: string} {
	const normalized = Array.isArray(el) ? el : [el];
	return {
		opening: normalized.map((e) => `<${e}>`).join(''),
		closing: normalized.toReversed().map((e) => `</${e}>`).join(''),
	};
}

export default {
	priority: 999,
	function: function transformInlineFormats(current: string): string {
		return fromLines(toLines(current).map((line) => {
			let newLine = line;
			for (const inlineFormat of INLINE_FORMATS) {
				const fence = escapeForRegExp(inlineFormat.fence);
				const {opening, closing} = buildElStr(inlineFormat.element);
				newLine = newLine.replace(new RegExp(`${fence}([^${fence[0]}]+.*)${fence}`, 'g'), `${opening}$1${closing}`);
			}
			return newLine;
		}));
	},
};
