import inlineFormats from './transforms/inline-formats';
import list from './transforms/list';
import title from './transforms/title';
import url from './transforms/url';
import {Options} from './index';

type Transform = {
	priority: number;
	function: (current: string, options: Options) => string;
};

const TRANSFORMS: Transform[] = [
	title,
	list,
	inlineFormats,
	url,
].sort(({priority: a}, {priority: b}) => b - a);

function runTransform(text: string, transform: Transform, strict: boolean, options: Options):
string {
	try {
		return transform.function(text, options);
	} catch (e) {
		if (strict) throw e;
		else return text;
	}
}

export function runAllTransforms(text: string, strict: boolean, options: Options): string {
	let out = text;
	for (const transform of TRANSFORMS) out = runTransform(out, transform, strict, options);
	return out;
}
